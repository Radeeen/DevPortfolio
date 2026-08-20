import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const config = readFileSync(join(process.cwd(), 'nuxt.config.ts'), 'utf-8')

describe('nuxt config invariants', () => {
  // Regression guard. This site is a fully prerendered static export, so no
  // runtime image optimiser exists. Left to auto-detect, @nuxt/image selects
  // Vercel's provider and rewrites every image to /_vercel/image?url=… — an
  // endpoint that is not provisioned on a static deployment. The images then
  // resolve to the 404 page and silently disappear from the case studies,
  // while the build, the tests and the local preview all stay green.
  //
  // This shipped to production once. It is a source-level assertion because
  // the failure only appears in built output on the host, which no unit test
  // in this suite can observe.
  it('pins the image provider so static builds emit real image paths', () => {
    expect(config).toMatch(/image:\s*\{[^}]*provider:\s*'none'/s)
  })

  // The static preset keeps output at .output/public, which vercel.json's
  // outputDirectory points at. Without it, Nitro auto-detects the vercel
  // preset from VERCEL=1 and writes to .vercel/output instead.
  it('pins the nitro preset to static', () => {
    expect(config).toMatch(/preset:\s*'static'/)
  })

  // og:image must be absolute — LinkedIn, WhatsApp and X do not resolve
  // relative paths when scraping a shared link.
  it('declares an absolute og:image', () => {
    const match = config.match(/property:\s*'og:image',\s*content:\s*'([^']+)'/)
    expect(match, 'og:image meta is missing from nuxt.config').not.toBeNull()
    expect(match![1]).toMatch(/^https:\/\//)
  })
})
