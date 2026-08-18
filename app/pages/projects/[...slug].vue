<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection('projects').path(route.path).first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: project.value.title,
  description: project.value.summary,
  ogTitle: project.value.title,
  ogDescription: project.value.summary,
})
</script>

<template>
  <article v-if="project" class="mx-auto max-w-5xl px-6 py-14">
    <NuxtLink
      to="/projects"
      class="mb-8 inline-block font-mono text-xs tracking-wide text-accent hover:underline"
    >
      &larr; All projects
    </NuxtLink>

    <div class="grid gap-10 md:grid-cols-[190px_1fr]">
      <CaseStudyMeta
        :project="{
          date: project.date,
          tags: project.tags,
          role: project.role,
          team: project.team,
          stack: project.stack,
          published: project.published,
          confidential: project.confidential ?? false,
          repo: project.repo,
          demo: project.demo,
        }"
      />

      <div>
        <h1 class="mb-4 text-3xl leading-tight font-semibold tracking-tight">
          {{ project.title }}
        </h1>
        <p class="mb-8 text-lg leading-relaxed text-muted">
          {{ project.summary }}
        </p>

        <MetricBand :metrics="project.metrics ?? []" class="mb-10" />

        <div class="case-study">
          <ContentRenderer :value="project" />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.case-study :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.case-study :deep(h3) {
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-ink);
}

.case-study :deep(p) {
  margin-bottom: 1rem;
  max-width: 72ch;
  line-height: 1.75;
  color: var(--color-muted);
}

.case-study :deep(ul) {
  margin-bottom: 1rem;
  padding-left: 1.25rem;
  list-style: disc;
  color: var(--color-muted);
  line-height: 1.75;
}

.case-study :deep(li) { margin-bottom: 0.35rem; }

.case-study :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
}

.case-study :deep(blockquote) {
  margin: 1.25rem 0;
  border-left: 2px solid var(--color-warn);
  background: color-mix(in srgb, var(--color-warn) 7%, transparent);
  padding: 0.75rem 1rem;
}

.case-study :deep(blockquote p) {
  margin-bottom: 0;
  color: #d4c4a8;
}

.case-study :deep(table) {
  margin-bottom: 1.5rem;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.case-study :deep(th),
.case-study :deep(td) {
  border-bottom: 1px solid var(--color-line);
  padding: 0.5rem 0.75rem;
  text-align: left;
  color: var(--color-muted);
}

.case-study :deep(th) {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-subtle);
}

.case-study :deep(img) {
  margin: 1.5rem 0;
  border: 1px solid var(--color-line);
  border-radius: 0.5rem;
  max-width: 100%;
  height: auto;
}
</style>
