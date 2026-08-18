import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '~/pages/about.vue'

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

describe('about page render', () => {
  it('renders the leadership roles, GPA and publication name', async () => {
    const wrapper = await mountSuspended(AboutPage)
    const text = wrapper.text()

    for (const role of ['Vice Chairman', 'Head of Supervisory Commission', 'Head of Strategy and Advocacy']) {
      expect(text, `rendered about page must show leadership role "${role}"`).toContain(role)
    }
    expect(text, 'rendered about page must show the GPA').toContain('3.59')
    expect(text, 'rendered about page must show the publication venue').toContain('JUSTIN')
  })
})
