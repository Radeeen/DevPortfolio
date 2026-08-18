import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CaseStudyMeta from '~/components/CaseStudyMeta.vue'

const base = {
  date: '2025-06',
  tags: ['data-ml'],
  role: 'Solo — thesis research',
  stack: ['Python', 'scikit-learn'],
  confidential: false,
}

describe('CaseStudyMeta', () => {
  it('renders role, year and stack', () => {
    const wrapper = mount(CaseStudyMeta, { props: { project: base } })
    expect(wrapper.text()).toContain('2025')
    expect(wrapper.text()).toContain('Solo — thesis research')
    expect(wrapper.text()).toContain('Python')
  })

  it('renders the publication when present', () => {
    const wrapper = mount(CaseStudyMeta, {
      props: { project: { ...base, published: 'JUSTIN Vol 12 No 2 (2024)' } },
    })
    expect(wrapper.text()).toContain('JUSTIN Vol 12 No 2 (2024)')
  })

  it('shows a confidentiality note instead of links when confidential', () => {
    const wrapper = mount(CaseStudyMeta, {
      props: { project: { ...base, confidential: true, repo: 'https://example.com' } },
    })
    expect(wrapper.text()).toContain('Source code is not public')
    expect(wrapper.find('a[href="https://example.com"]').exists()).toBe(false)
  })
})
