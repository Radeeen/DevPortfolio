import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const source = readFileSync(join(process.cwd(), 'app/pages/index.vue'), 'utf-8')

describe('home page source', () => {
  it('leads with the fullstack positioning, not data analysis', () => {
    expect(source).toContain('Fullstack Developer')
  })

  it('names the technologies missing from the old portfolio', () => {
    for (const tech of ['Laravel', 'Vue', 'Node.js']) {
      expect(source, `home page must mention ${tech}`).toContain(tech)
    }
    expect(source, 'home page must mention Java standalone, not just as part of JavaScript').toMatch(
      /\bJava\b(?!Script)/,
    )
  })

  it('queries only featured projects', () => {
    expect(source).toContain("where('featured', '=', true)")
  })
})
