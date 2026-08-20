import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MetricBand from '~/components/MetricBand.vue'

describe('MetricBand', () => {
  it('renders every metric value and label', () => {
    const wrapper = mount(MetricBand, {
      props: {
        metrics: [
          { value: '2,841', label: 'Comments collected' },
          { value: '92%', label: 'Extra Trees accuracy' },
        ],
      },
    })
    expect(wrapper.text()).toContain('2,841')
    expect(wrapper.text()).toContain('Comments collected')
    expect(wrapper.text()).toContain('92%')
  })

  it('puts each label in a dt and its value in the matching dd', () => {
    const wrapper = mount(MetricBand, {
      props: {
        metrics: [
          { value: '2,841', label: 'Comments collected' },
          { value: '92%', label: 'Extra Trees accuracy' },
        ],
      },
    })
    const groups = wrapper.findAll('dl > div')
    expect(groups).toHaveLength(2)
    expect(groups[0]!.find('dt').text()).toBe('Comments collected')
    expect(groups[0]!.find('dd').text()).toBe('2,841')
    expect(groups[1]!.find('dt').text()).toBe('Extra Trees accuracy')
    expect(groups[1]!.find('dd').text()).toBe('92%')
  })

  it('renders nothing when there are no metrics', () => {
    const wrapper = mount(MetricBand, { props: { metrics: [] } })
    expect(wrapper.find('dl').exists()).toBe(false)
  })
})
