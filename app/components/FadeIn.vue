<script setup lang="ts">
const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 12 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, margin: '-60px' }"
    :transition="{ duration: 0.4, delay: props.delay, ease: 'easeOut' }"
  >
    <slot />
  </Motion>
</template>
