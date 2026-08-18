<script setup lang="ts">
const props = defineProps<{ tags: string[], modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()

const LABELS: Record<string, string> = {
  'all': 'All',
  'fullstack': 'Fullstack',
  'data-ml': 'Data & ML',
  'ui-ux': 'UI/UX',
}

const options = computed(() => ['all', ...props.tags])
</script>

<template>
  <div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :aria-pressed="props.modelValue === option"
      class="rounded border px-3 py-1.5 font-mono text-xs transition-colors"
      :class="props.modelValue === option
        ? 'border-accent bg-accent/10 text-accent'
        : 'border-line text-subtle hover:text-ink'"
      @click="$emit('update:modelValue', option)"
    >
      {{ LABELS[option] ?? option }}
    </button>
  </div>
</template>
