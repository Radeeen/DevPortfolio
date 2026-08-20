import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import app from '~/app.vue'

describe('application shell', () => {
  it('mounts and renders the default layout', async () => {
    const wrapper = await mountSuspended(app)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('main').exists(), 'expected a <main> landmark').toBe(true)
    expect(wrapper.find('header').exists(), 'expected the site header to render').toBe(true)
    expect(wrapper.find('footer').exists(), 'expected the site footer to render').toBe(true)
  })
})
