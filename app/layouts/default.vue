<template>
  <div class="flex min-h-screen flex-col bg-bg text-ink">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-accent"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main" tabindex="-1" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
