# DevPortfolio

Personal portfolio of R Herick Fauzi Komara Kusumah — fullstack developer.

Built with Nuxt 4, Tailwind CSS v4 and `@nuxt/content`. Statically generated,
deployed on Vercel.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest
npm run generate   # static build to .output/public
```

## Adding a project

Create a Markdown file in `content/projects/`. The frontmatter schema is defined
in `content.config.ts` and validated at build time — a missing or misspelled
field fails the build rather than rendering an empty page.

## Configuration

Copy `.env.example` to `.env`. `NUXT_PUBLIC_WHATSAPP` is optional; leaving it
blank hides the WhatsApp link. Personal contact numbers are deliberately kept
out of version control.
