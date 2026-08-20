<script setup lang="ts">
import { computed } from 'vue'
import { useReducedMotion } from 'motion-v'

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

// motion-v's built-in reduced-motion handling only substitutes an instant
// transition for positional keys (y, x, width, height, top, left) — opacity is
// not positional, so leaving it alone would still run the full fade for users
// who prefer reduced motion. `main.css`'s CSS `transition-duration` override
// has no effect here either, because Motion animates via WAAPI/inline styles,
// not CSS transitions. So we detect the preference ourselves with
// `useReducedMotion` (motion-v's SSR-safe wrapper around VueUse's
// `useMediaQuery`) and render with no animation at all when it is set: the
// initial state already equals the final state, and the transition duration
// is zero.
const prefersReducedMotion = useReducedMotion()

const initial = computed(() =>
  prefersReducedMotion.value ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
)
const transition = computed(() =>
  prefersReducedMotion.value
    ? { duration: 0 }
    : { duration: 0.4, delay: props.delay, ease: 'easeOut' },
)
</script>

<template>
  <Motion
    :initial="initial"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, margin: '-60px' }"
    :transition="transition"
  >
    <slot />
  </Motion>
</template>
