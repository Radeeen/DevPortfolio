import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagFilter from '~/components/TagFilter.vue'

describe('TagFilter', () => {
  const tags = ['fullstack', 'data-ml', 'ui-ux']

  it('renders an "All" button plus one per tag', () => {
    const wrapper = mount(TagFilter, { props: { tags, modelValue: 'all' } })
    expect(wrapper.findAll('button')).toHaveLength(4)
  })

  it('emits the tag when a button is clicked', async () => {
    const wrapper = mount(TagFilter, { props: { tags, modelValue: 'all' } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['fullstack'])
  })

  it('marks the active tag with aria-pressed', () => {
    const wrapper = mount(TagFilter, { props: { tags, modelValue: 'data-ml' } })
    const pressed = wrapper.findAll('button').filter(b => b.attributes('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(pressed[0].text()).toContain('Data')
  })
})
