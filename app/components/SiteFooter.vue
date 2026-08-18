<script setup lang="ts">
const config = useRuntimeConfig()
const whatsapp = computed(() => config.public.whatsapp as string)
</script>

<template>
  <footer class="mt-24 border-t border-line">
    <div class="mx-auto max-w-4xl px-6 py-10">
      <SectionLabel as="h2">Contact</SectionLabel>
      <p class="mb-5 max-w-lg text-sm leading-relaxed text-muted">
        Open to fullstack and data roles in Jakarta or remote. The fastest way to
        reach me is email.
      </p>
      <ul class="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        <li>
          <a class="text-accent hover:underline" href="mailto:r.herick.fkk@gmail.com">
            r.herick.fkk@gmail.com
          </a>
        </li>
        <li>
          <a
            class="text-accent hover:underline"
            href="https://linkedin.com/in/herickfauzi"
            rel="noopener noreferrer"
            target="_blank"
          >LinkedIn</a>
        </li>
        <li v-if="whatsapp">
          <a
            class="text-accent hover:underline"
            :href="`https://wa.me/${whatsapp}`"
            rel="noopener noreferrer"
            target="_blank"
          >WhatsApp</a>
        </li>
      </ul>
      <p class="mt-8 text-xs text-subtle">
        © 2026 R Herick Fauzi Komara Kusumah — built with Nuxt.
      </p>
    </div>
  </footer>
</template>
