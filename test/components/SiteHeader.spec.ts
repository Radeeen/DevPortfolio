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
})
