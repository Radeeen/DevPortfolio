<template>
  <header class="border-b border-line">
    <div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
      <NuxtLink to="/" class="font-mono text-sm font-semibold text-ink">
        herick<span class="text-accent">.dev</span>
      </NuxtLink>
      <nav aria-label="Main">
        <ul class="flex items-center gap-6 text-sm text-muted">
          <li>
            <NuxtLink v-slot="{ href, navigate, isActive }" to="/projects" custom>
              <a :href="href ?? undefined" class="hover:text-ink" :class="{ 'text-ink': isActive }" @click="navigate">Work</a>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-slot="{ href, navigate, isActive }" to="/about" custom>
              <a :href="href ?? undefined" class="hover:text-ink" :class="{ 'text-ink': isActive }" @click="navigate">About</a>
            </NuxtLink>
          </li>
          <li>
            <a href="/cv.pdf" class="hover:text-ink" download>CV</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
