<script setup lang="ts">
interface CardProject {
  path: string
  title: string
  summary: string
  stack: string[]
}

const props = defineProps<{ project: CardProject }>()
</script>

<template>
  <NuxtLink
    :to="props.project.path"
    class="group block rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent/50"
  >
    <h3 class="text-base font-semibold text-ink group-hover:text-accent">
      {{ props.project.title }}
    </h3>
    <p class="mt-2 text-sm leading-relaxed text-muted">
      {{ props.project.summary }}
    </p>
    <ul class="mt-4 flex flex-wrap gap-2">
      <li
        v-for="tech in props.project.stack"
        :key="tech"
        class="rounded border border-line px-2 py-0.5 font-mono text-xs text-subtle"
      >
        {{ tech }}
      </li>
    </ul>
  </NuxtLink>
</template>
