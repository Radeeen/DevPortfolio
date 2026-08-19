import { describe, it, expect } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'

const PROJECTS = [
  {
    path: '/projects/modular-monolith-platform',
    title: 'Modular Monolith Platform for Government Internal Operations',
    summary: 'A nine-module Laravel platform.',
    tags: ['fullstack'],
    stack: ['Laravel 12'],
    date: '2026-03',
  },
  {
    path: '/projects/sentiment-analysis',
    title: 'Sentiment Analysis of DPR RI Social Media, with a Green Computing Lens',
    summary: 'Comparing Extra Trees against Random Forest.',
    tags: ['data-ml'],
    stack: ['Python'],
    date: '2025-06',
  },
  {
    path: '/projects/license-plate-recognition',
    title: 'License Plate Recognition at a Parliament Vehicle Gate',
    summary: 'A YOLOv8 and OCR pipeline.',
    tags: ['data-ml'],
    stack: ['Python'],
    date: '2024-05',
  },
  {
    path: '/projects/parliament-navigation-map',
    title: 'Parliament Building Navigation Map',
    summary: 'An interactive 3D navigation map.',
    tags: ['fullstack'],
    stack: ['Unity 3D'],
    date: '2024-03',
  },
  {
    path: '/projects/partner-dataset-analysis',
    title: 'Partner Dataset Analysis for Parliamentary Meetings',
    summary: 'Processing and visualising partner datasets in Tableau.',
    tags: ['data-ml'],
    stack: ['Tableau'],
    date: '2024-02',
  },
  {
    path: '/projects/simpan-spbe-tasikmalaya',
    title: 'SIMPAN SPBE Tasikmalaya — Government Service Interface',
    summary: 'Research-led UI design for a municipal government platform.',
    tags: ['ui-ux'],
    stack: ['Figma'],
    date: '2023-08',
  },
]

mockNuxtImport('queryCollection', () => {
  return () => ({
    order: () => ({
      all: async () => PROJECTS,
    }),
  })
})

describe('projects index page render', () => {
  it('shows every project and the correct initial count', async () => {
    const ProjectsIndexPage = await import('~/pages/projects/index.vue').then(m => m.default)
    const wrapper = await mountSuspended(ProjectsIndexPage)
    const text = wrapper.text()

    for (const project of PROJECTS) {
      expect(text, `must show project "${project.title}"`).toContain(project.title)
    }
    expect(text).toContain('Showing 6 of 6')
  })

  it('narrows the visible cards and updates the count when a tag filter is clicked', async () => {
    const ProjectsIndexPage = await import('~/pages/projects/index.vue').then(m => m.default)
    const wrapper = await mountSuspended(ProjectsIndexPage)

    const dataMlButton = wrapper.findAll('button').find(b => b.text().includes('Data & ML'))
    expect(dataMlButton, 'expected a "Data & ML" filter button to exist').toBeTruthy()
    await dataMlButton!.trigger('click')

    const text = wrapper.text()
    expect(text).toContain('Showing 3 of 6')

    const dataMlTitles = PROJECTS.filter(p => p.tags.includes('data-ml')).map(p => p.title)
    for (const title of dataMlTitles) {
      expect(text, `must still show data-ml project "${title}"`).toContain(title)
    }

    const otherTitles = PROJECTS.filter(p => !p.tags.includes('data-ml')).map(p => p.title)
    for (const title of otherTitles) {
      expect(text, `must hide non-data-ml project "${title}"`).not.toContain(title)
    }
  })

  it('exposes the count as an aria-live region so screen readers announce filter changes', async () => {
    const ProjectsIndexPage = await import('~/pages/projects/index.vue').then(m => m.default)
    const wrapper = await mountSuspended(ProjectsIndexPage)

    const countEl = wrapper.findAll('p').find(p => p.text().includes('Showing'))
    expect(countEl, 'expected a "Showing X of Y" element').toBeTruthy()
    expect(countEl!.attributes('aria-live')).toBe('polite')
  })
})
