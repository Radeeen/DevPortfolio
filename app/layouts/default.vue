<template>
  <div class="flex min-h-screen flex-col bg-bg text-ink">
    <SiteHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
