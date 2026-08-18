import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FadeIn from '~/components/FadeIn.vue'

describe('FadeIn', () => {
  it('renders its slot content', async () => {
    const wrapper = await mountSuspended(FadeIn, {
      slots: { default: () => 'visible content' },
    })
    expect(wrapper.text()).toContain('visible content')
  })

  describe('when the user prefers reduced motion', () => {
    const originalMatchMedia = window.matchMedia

    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: (query: string) => ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          addListener: () => {},
          removeListener: () => {},
          dispatchEvent: () => false,
        }),
      })
    })

    afterEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: originalMatchMedia,
      })
    })

    it('still renders its slot content and configures no opacity animation', async () => {
      const wrapper = await mountSuspended(FadeIn, {
        slots: { default: () => 'visible content' },
      })
      expect(wrapper.text()).toContain('visible content')

      // With reduced motion preferred, the element must start already at its
      // final, fully-visible state instead of fading in from opacity 0.
      const style = wrapper.attributes('style') ?? ''
      expect(style).toContain('opacity: 1')
      expect(style).not.toContain('opacity: 0')
    })
  })
})
