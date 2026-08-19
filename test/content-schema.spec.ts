import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'

const DIR = join(process.cwd(), 'content/projects')
const VALID_TAGS = ['fullstack', 'data-ml', 'ui-ux']

// Truncated SHA-256 of each restricted term. The terms are the internal system
// name and working-unit module names of the government platform described in
// the portfolio; they must never appear in anything published. Storing hashes
// rather than the words keeps this guard readable in a public repository
// without disclosing what it guards. Lengths are needed because matching is
// done over substrings, so a term embedded inside a longer token is still hit.
const RESTRICTED_HASHES = new Set([
  'e96f6ef044e82981',
  '8511246b674283ea',
  'afa727d19c4764c8',
  '15f3bba2b3c00213',
  'b8d0ebb1eb62250e',
  '95e70489b4d36ec4',
  '82b47b40fd574b07',
])
const RESTRICTED_LENGTHS = [4, 5, 6, 11, 12]

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16)
}

/** Returns the hashes of any restricted terms found, never the terms themselves. */
function findRestrictedTerms(text: string): string[] {
  const hits = new Set<string>()
  for (const token of text.toLowerCase().split(/[^a-z0-9]+/)) {
    for (const len of RESTRICTED_LENGTHS) {
      for (let i = 0; i + len <= token.length; i++) {
        const h = hash(token.slice(i, i + len))
        if (RESTRICTED_HASHES.has(h)) hits.add(h)
      }
    }
  }
  return [...hits]
}

function frontmatter(file: string): Record<string, string> {
  const raw = readFileSync(join(DIR, file), 'utf-8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) throw new Error(`${file} has no frontmatter`)
  const result: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) result[kv[1]] = kv[2]
  }
  return result
}

describe('project content files', () => {
  const files = readdirSync(DIR).filter(f => f.endsWith('.md'))

  it('has at least one project', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  it.each(files)('%s declares every required field', (file) => {
    const fm = frontmatter(file)
    for (const key of ['title', 'summary', 'date', 'tags', 'role', 'featured']) {
      expect(fm[key], `${file} is missing "${key}"`).toBeDefined()
    }
  })

  it.each(files)('%s uses only valid tags', (file) => {
    const tags = frontmatter(file).tags ?? ''
    const parsed = tags.replace(/[[\]]/g, '').split(',').map(t => t.trim()).filter(Boolean)
    expect(parsed.length).toBeGreaterThan(0)
    for (const tag of parsed) {
      expect(VALID_TAGS, `${file} has invalid tag "${tag}"`).toContain(tag)
    }
  })

  it.each(files)('%s never leaks a restricted term', (file) => {
    const hits = findRestrictedTerms(readFileSync(join(DIR, file), 'utf-8'))
    expect(hits, `${file} leaks a restricted term (${hits.length} hit(s))`).toEqual([])
  })
})

describe('restricted terms across the whole shipped surface', () => {
  // The confidentiality guard used to hold the banned words in plaintext, which
  // published in a public repo exactly what it existed to suppress. Terms are
  // matched by hash instead, so this file can be read by anyone without
  // disclosing them.
  const targets = [
    ...readdirSync(DIR).filter(f => f.endsWith('.md')).map(f => join(DIR, f)),
    ...readdirSync(join(process.cwd(), 'app/pages'), { recursive: true })
      .filter((f): f is string => typeof f === 'string' && f.endsWith('.vue'))
      .map(f => join(process.cwd(), 'app/pages', f)),
    ...readdirSync(join(process.cwd(), 'app/components'))
      .filter(f => f.endsWith('.vue'))
      .map(f => join(process.cwd(), 'app/components', f)),
    join(process.cwd(), 'README.md'),
  ]

  it.each(targets)('%s is clean', (path) => {
    const hits = findRestrictedTerms(readFileSync(path, 'utf-8'))
    expect(hits, `${path} leaks a restricted term (${hits.length} hit(s))`).toEqual([])
  })
})
