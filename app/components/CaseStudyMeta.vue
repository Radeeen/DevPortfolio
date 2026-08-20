<script setup lang="ts">
interface MetaProject {
  date: string
  tags: string[]
  role: string
  team?: string
  stack: string[]
  published?: string
  confidential: boolean
  repo?: string
  demo?: string
}

const props = defineProps<{ project: MetaProject }>()

const LABELS: Record<string, string> = {
  'fullstack': 'Fullstack',
  'data-ml': 'Data & ML',
  'ui-ux': 'UI/UX',
}

const year = computed(() => props.project.date.slice(0, 4))
const category = computed(() =>
  props.project.tags.map(tag => LABELS[tag] ?? tag).join(', '),
)
const showLinks = computed(
  () => props.project.confidential === false && (props.project.repo || props.project.demo),
)
</script>

<template>
  <aside class="md:sticky md:top-8 md:self-start">
    <dl class="space-y-4 border-line md:border-r md:pr-6">
      <div>
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Year</dt>
        <dd class="mt-1 font-mono text-sm text-ink">{{ year }}</dd>
      </div>
      <div>
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Category</dt>
        <dd class="mt-1 text-sm text-ink">{{ category }}</dd>
      </div>
      <div>
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Role</dt>
        <dd class="mt-1 text-sm leading-snug text-ink">{{ props.project.role }}</dd>
      </div>
      <div v-if="props.project.team">
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Team</dt>
        <dd class="mt-1 text-sm leading-snug text-ink">{{ props.project.team }}</dd>
      </div>
      <div>
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Stack</dt>
        <dd class="mt-1 flex flex-wrap gap-1.5">
          <span
            v-for="tech in props.project.stack"
            :key="tech"
            class="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted"
          >{{ tech }}</span>
        </dd>
      </div>
      <div v-if="props.project.published">
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Published</dt>
        <dd class="mt-1 text-sm leading-snug text-ink">{{ props.project.published }}</dd>
      </div>
      <div v-if="showLinks">
        <dt class="font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Links</dt>
        <dd class="mt-1 space-y-1">
          <a
            v-if="props.project.repo"
            :href="props.project.repo"
            class="block text-sm text-accent hover:underline"
            rel="noopener"
            target="_blank"
          >Repository</a>
          <a
            v-if="props.project.demo"
            :href="props.project.demo"
            class="block text-sm text-accent hover:underline"
            rel="noopener"
            target="_blank"
          >Gallery</a>
        </dd>
      </div>
    </dl>
    <p v-if="props.project.confidential" class="mt-4 text-xs leading-relaxed text-subtle">
      Source code is not public — this system runs inside a government network.
    </p>
  </aside>
</template>
