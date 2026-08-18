import { describe, it, expect } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import SiteFooter from '~/components/SiteFooter.vue'

let mockWhatsapp = ''

mockNuxtImport('useRuntimeConfig', (original) => {
  return () => {
    const config = original()
    config.public.whatsapp = mockWhatsapp
    return config
  }
})

describe('SiteFooter', () => {
  it('renders the email and LinkedIn contact links', async () => {
    mockWhatsapp = ''
    const wrapper = await mountSuspended(SiteFooter)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('mailto:r.herick.fkk@gmail.com')
    expect(hrefs).toContain('https://linkedin.com/in/herickfauzi')
  })

  it('does not render a WhatsApp link when the env var is unset', async () => {
    mockWhatsapp = ''
    const wrapper = await mountSuspended(SiteFooter)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs.some(href => href?.includes('wa.me'))).toBe(false)
    expect(wrapper.text()).not.toContain('WhatsApp')
  })

  it('renders a WhatsApp link when the env var is set', async () => {
    mockWhatsapp = '000'
    const wrapper = await mountSuspended(SiteFooter)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('https://wa.me/000')
    expect(wrapper.text()).toContain('WhatsApp')
  })
})
