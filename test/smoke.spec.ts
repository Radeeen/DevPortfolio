import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import app from '~/app.vue'

describe('application shell', () => {
  it('mounts without error', async () => {
    const wrapper = await mountSuspended(app)
    expect(wrapper.exists()).toBe(true)
  })
})
