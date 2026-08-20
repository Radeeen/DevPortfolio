import { describe, it, expect } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import SiteFooter from '~/components/SiteFooter.vue'

let mockWhatsapp: string | number = ''

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

  it('renders a WhatsApp link when the env var arrives as a number (destr parses digit-only env strings to Number)', async () => {
    // Simulates the real runtime shape: Nuxt's destr parses an unquoted
    // NUXT_PUBLIC_WHATSAPP env value into a JS number, even though the
    // runtimeConfig default and TS type say string.
    mockWhatsapp = 6285320442887
    const wrapper = await mountSuspended(SiteFooter)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('https://wa.me/6285320442887')
    expect(wrapper.text()).toContain('WhatsApp')
  })

  it('strips formatting characters from the wa.me href (format guard)', async () => {
    // If the env var is ever set with human-friendly formatting (spaces,
    // dashes, a leading +), destr leaves it as a string and the raw value
    // must not be inlined verbatim into the wa.me deep link.
    mockWhatsapp = '+62 853-2044-2887'
    const wrapper = await mountSuspended(SiteFooter)
    const hrefs = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(hrefs).toContain('https://wa.me/6285320442887')
  })
})
