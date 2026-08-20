import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionLabel from '~/components/SectionLabel.vue'

describe('SectionLabel', () => {
  it('renders a p by default', () => {
    const wrapper = mount(SectionLabel, { slots: { default: 'Selected work' } })
    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.text()).toBe('Selected work')
  })

  it('renders an h2 when as="h2" is passed', () => {
    const wrapper = mount(SectionLabel, {
      props: { as: 'h2' },
      slots: { default: 'Experience' },
    })
    expect(wrapper.element.tagName).toBe('H2')
    expect(wrapper.text()).toBe('Experience')
  })

  it('keeps the same classes regardless of the rendered tag', () => {
    const asP = mount(SectionLabel, { slots: { default: 'Skills' } })
    const asH2 = mount(SectionLabel, { props: { as: 'h2' }, slots: { default: 'Skills' } })
    expect(asH2.attributes('class')).toBe(asP.attributes('class'))
  })
})
