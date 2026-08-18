<template>
  <header class="border-b border-line">
    <div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
      <NuxtLink to="/" class="font-mono text-sm font-semibold text-ink">
        herick<span class="text-accent">.dev</span>
      </NuxtLink>
      <nav aria-label="Main">
        <ul class="flex items-center gap-6 text-sm text-muted">
          <li><NuxtLink to="/projects" class="hover:text-ink">Work</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-ink">About</NuxtLink></li>
          <li>
            <a href="/cv.pdf" class="hover:text-ink" download>CV</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
