<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const status = computed(() => props.error.status)

const message = computed(() => {
  if (status.value === 404) return 'This page does not exist.'
  return 'Something went wrong.'
})

function handleHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg text-ink">
    <main class="mx-auto flex max-w-4xl flex-1 flex-col items-start justify-center px-6 py-14">
      <p v-if="status" class="font-mono text-sm text-accent">{{ status }}</p>
      <h1 class="mt-3 mb-3 text-3xl font-semibold tracking-tight">{{ message }}</h1>
      <p class="mb-8 max-w-md leading-relaxed text-muted">
        Try heading back to the home page.
      </p>
      <a
        href="/"
        class="font-mono text-sm text-accent hover:underline"
        @click.prevent="handleHome"
      >&larr; Back home</a>
    </main>
  </div>
</template>
