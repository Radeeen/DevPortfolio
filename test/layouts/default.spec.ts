import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '~/layouts/default.vue'

describe('default layout', () => {
  it('gives the main landmark a negative tabindex so the skip link can move focus to it', async () => {
    const wrapper = await mountSuspended(DefaultLayout)
    expect(wrapper.find('main#main').attributes('tabindex')).toBe('-1')
  })
})
