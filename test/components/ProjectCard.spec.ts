import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProjectCard from '~/components/ProjectCard.vue'

const project = {
  path: '/projects/sentiment-analysis',
  title: 'Sentiment Analysis of DPR RI Social Media',
  summary: 'Comparing Extra Trees against Random Forest on 2,841 public comments.',
  stack: ['Python', 'scikit-learn'],
}

describe('ProjectCard', () => {
  it('renders the title and summary', async () => {
    const wrapper = await mountSuspended(ProjectCard, { props: { project } })
    expect(wrapper.text()).toContain('Sentiment Analysis of DPR RI Social Media')
    expect(wrapper.text()).toContain('Extra Trees')
  })

  it('links to the project path', async () => {
    const wrapper = await mountSuspended(ProjectCard, { props: { project } })
    expect(wrapper.find('a').attributes('href')).toBe('/projects/sentiment-analysis')
  })

  it('renders each stack entry', async () => {
    const wrapper = await mountSuspended(ProjectCard, { props: { project } })
    expect(wrapper.text()).toContain('Python')
    expect(wrapper.text()).toContain('scikit-learn')
  })
})
