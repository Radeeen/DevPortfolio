import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '~/pages/about.vue'

const source = readFileSync(join(process.cwd(), 'app/pages/about.vue'), 'utf-8')

describe('about page source', () => {
  // The render test below proves JUSTIN and 3.59 are visible on the rendered
  // page. "Bank Indonesia Scholarship" is kept as a source-only assertion
  // because it names a credibility signal that render tests elsewhere don't
  // independently re-verify the exact wording of — it guards against the
  // award name being silently reworded or dropped from the source.
  it('includes the Bank Indonesia Scholarship credibility signal', () => {
    expect(source).toContain('Bank Indonesia Scholarship')
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
