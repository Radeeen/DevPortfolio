import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'

const source = readFileSync(join(process.cwd(), 'app/pages/index.vue'), 'utf-8')

const FEATURED = [
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
]

mockNuxtImport('queryCollection', () => {
  return () => ({
    where: () => ({
      order: () => ({
        all: async () => FEATURED,
      }),
    }),
  })
})

describe('home page source', () => {
  it('leads with the fullstack positioning, not data analysis', () => {
    expect(source).toContain('Fullstack Developer')
  })

  it('names the technologies missing from the old portfolio', () => {
    for (const tech of ['Laravel', 'Vue', 'Node.js']) {
      expect(source, `home page must mention ${tech}`).toContain(tech)
    }
    expect(source, 'home page must mention Java standalone, not just as part of JavaScript').toMatch(
      /\bJava\b(?!Script)/,
    )
  })

  it('queries only featured projects', () => {
    expect(source).toContain("where('featured', '=', true)")
  })
})

describe('home page render', () => {
  it('renders the core stack and featured project titles', async () => {
    const IndexPage = await import('~/pages/index.vue').then(m => m.default)
    const wrapper = await mountSuspended(IndexPage)
    const text = wrapper.text()

    for (const tech of ['Laravel', 'Vue', 'Node.js']) {
      expect(text, `rendered home page must show ${tech}`).toContain(tech)
    }
    expect(text, 'rendered home page must show Java standalone, not just as part of JavaScript').toMatch(
      /\bJava\b(?!Script)/,
    )

    for (const project of FEATURED) {
      expect(text, `rendered home page must show featured project "${project.title}"`).toContain(project.title)
    }
  })
})
