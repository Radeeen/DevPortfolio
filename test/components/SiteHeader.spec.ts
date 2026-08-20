import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/SiteHeader.vue'

describe('SiteHeader', () => {
  it('links to work, about and the CV', async () => {
    const wrapper = await mountSuspended(SiteHeader)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('/projects')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/cv.pdf')
  })

  it('exposes a navigation landmark', async () => {
    const wrapper = await mountSuspended(SiteHeader)
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('visually distinguishes the active nav link from inactive ones', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/projects' })

    const workLink = wrapper.findAll('a').find(a => a.attributes('href') === '/projects')
    const aboutLink = wrapper.findAll('a').find(a => a.attributes('href') === '/about')

    expect(workLink, 'expected a link to /projects').toBeTruthy()
    expect(aboutLink, 'expected a link to /about').toBeTruthy()
    expect(workLink!.classes(), 'active link must carry a distinct text colour class').toContain('text-ink')
    expect(aboutLink!.classes(), 'inactive link must not carry the active text colour class').not.toContain('text-ink')
  })
})
