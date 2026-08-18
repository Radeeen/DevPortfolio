import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FadeIn from '~/components/FadeIn.vue'

describe('FadeIn', () => {
  it('renders its slot content', async () => {
    const wrapper = await mountSuspended(FadeIn, {
      slots: { default: () => 'visible content' },
    })
    expect(wrapper.text()).toContain('visible content')
  })
})
