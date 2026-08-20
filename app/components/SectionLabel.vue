<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), { as: 'p' })
</script>

<template>
  <component :is="as" class="mb-4 font-mono text-xs tracking-[0.14em] text-accent uppercase">
    <slot />
  </component>
</template>
