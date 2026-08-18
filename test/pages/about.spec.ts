import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const source = readFileSync(join(process.cwd(), 'app/pages/about.vue'), 'utf-8')

describe('about page source', () => {
  it('includes the three credibility signals', () => {
    expect(source).toContain('JUSTIN')
    expect(source).toContain('Bank Indonesia Scholarship')
    expect(source).toContain('3.59')
  })

  it('records the organisational leadership roles', () => {
    expect(source).toContain('Vice Chairman')
    expect(source).toContain('Head of Supervisory Commission')
    expect(source).toContain('Head of Strategy and Advocacy')
  })
})
