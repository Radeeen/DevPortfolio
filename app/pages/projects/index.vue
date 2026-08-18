<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-index', () =>
  queryCollection('projects').order('date', 'DESC').all(),
)

type ProjectTag = 'fullstack' | 'data-ml' | 'ui-ux'

const selected = ref<ProjectTag | 'all'>('all')

const tags = computed(() => {
  const seen = new Set<string>()
  for (const project of projects.value ?? []) {
    for (const tag of project.tags ?? []) seen.add(tag)
  }
  return ['fullstack', 'data-ml', 'ui-ux'].filter(t => seen.has(t))
})

const visible = computed(() => {
  const all = projects.value ?? []
  const tag = selected.value
  if (tag === 'all') return all
  return all.filter(project => (project.tags ?? []).includes(tag))
})

useSeoMeta({
  title: 'Work',
  description:
    'Fullstack, data and machine learning projects built for Indonesian government institutions.',
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-14">
    <SectionLabel>Work</SectionLabel>
    <h1 class="mb-3 text-3xl font-semibold tracking-tight">Projects</h1>
    <p class="mb-8 max-w-2xl leading-relaxed text-muted">
      Six projects spanning production web systems, applied machine learning and
      interface design. Filter by the category you care about.
    </p>

    <TagFilter v-model="selected" :tags="tags" class="mb-8" />

    <p class="mb-4 font-mono text-xs text-subtle">
      Showing {{ visible.length }} of {{ projects?.length ?? 0 }}
    </p>

    <div class="grid gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in visible"
        :key="project.path"
        :project="{
          path: project.path,
          title: project.title,
          summary: project.summary,
          tags: project.tags,
          stack: project.stack,
        }"
      />
    </div>
  </div>
</template>
