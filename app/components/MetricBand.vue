<script setup lang="ts">
interface Metric {
  value: string
  label: string
}

const props = defineProps<{ metrics: Metric[] }>()
</script>

<template>
  <dl
    v-if="props.metrics.length"
    class="grid gap-3"
    :class="props.metrics.length > 2 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'"
  >
    <div
      v-for="metric in props.metrics"
      :key="metric.label"
      class="rounded-lg border border-line bg-surface px-4 py-3"
    >
      <dd class="font-mono text-2xl font-semibold text-accent">
        {{ metric.value }}
      </dd>
      <dt class="mt-1 text-xs leading-snug tracking-wide text-subtle uppercase">
        {{ metric.label }}
      </dt>
    </div>
  </dl>
</template>
