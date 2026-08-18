import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(process.cwd(), 'content/projects')
const VALID_TAGS = ['fullstack', 'data-ml', 'ui-ux']

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

  it.each(files)('%s never leaks the restricted module names', (file) => {
    const raw = readFileSync(join(DIR, file), 'utf-8').toLowerCase()
    for (const banned of ['eperformance', 'puupolhukham', 'puspanlakuu', 'cmsbkd', 'pusaka', 'ksap', 'sileg']) {
      expect(raw, `${file} leaks restricted term "${banned}"`).not.toContain(banned)
    }
  })
})
