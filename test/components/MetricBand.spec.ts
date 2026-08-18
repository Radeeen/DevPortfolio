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

  it('renders nothing when there are no metrics', () => {
    const wrapper = mount(MetricBand, { props: { metrics: [] } })
    expect(wrapper.find('dl').exists()).toBe(false)
  })
})
