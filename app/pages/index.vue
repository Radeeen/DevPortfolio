<script setup lang="ts">
const { data: featured } = await useAsyncData('featured-projects', () =>
  queryCollection('projects')
    .where('featured', '=', true)
    .order('date', 'DESC')
    .all(),
)

const experience = [
  {
    role: 'Fullstack Developer',
    org: 'Persada Era Cendekia — assigned to DPR RI',
    period: 'Mar 2026 — Present',
    note: 'Laravel, Node.js/Express, Vue and MySQL for parliamentary internal operations.',
  },
  {
    role: 'Ads Quality Rater',
    org: 'Welocalize',
    period: 'Dec 2025 — May 2026',
    note: 'Evaluating advertisement relevance and landing-page quality against published guidelines.',
  },
  {
    role: 'IT Programmer, Internship',
    org: 'DPR RI',
    period: 'Feb 2024 — Jun 2024',
    note: 'Java, Python and JavaScript application work through the MSIB programme.',
  },
  {
    role: 'UI/UX Designer, Internship',
    org: 'Diskominfo Tasikmalaya',
    period: 'Aug 2023 — Oct 2023',
    note: 'Research, wireframes and prototypes for municipal government services.',
  },
]

const skills = [
  { group: 'Backend', items: ['PHP', 'Laravel', 'Node.js/Express', 'Java', 'Python', 'MySQL'] },
  { group: 'Frontend', items: ['Vue', 'JavaScript', 'HTML', 'CSS', 'Tailwind'] },
  { group: 'Data & ML', items: ['scikit-learn', 'YOLOv8', 'Pandas', 'Tableau'] },
  { group: 'Design & 3D', items: ['Figma', 'Blender', 'Unity 3D'] },
]

useSeoMeta({
  title: 'Fullstack Developer',
  description:
    'Fullstack developer building production systems for Indonesian government institutions. Laravel, Vue, Node.js, and applied machine learning.',
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-6">
    <section class="py-16">
      <SectionLabel>Fullstack Developer</SectionLabel>
      <h1 class="mb-5 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
        R Herick Fauzi<br>Komara Kusumah
      </h1>
      <p class="mb-8 max-w-2xl text-lg leading-relaxed text-muted">
        I build and maintain production systems for Indonesian government
        institutions — currently a nine-module Laravel platform serving DPR RI's
        internal operations. Laravel, Vue, Node.js and Java on the engineering
        side; a published thesis in applied machine learning behind it.
      </p>
      <MetricBand
        :metrics="[
          { value: '9', label: 'Modules in production' },
          { value: '141', label: 'Service classes' },
          { value: '2,841', label: 'Comments analysed' },
          { value: '2', label: 'Peer-reviewed papers' },
        ]"
      />
    </section>

    <FadeIn>
      <section class="py-10">
        <SectionLabel as="h2">Selected work</SectionLabel>
        <ul class="grid gap-4 sm:grid-cols-2">
          <li v-for="project in featured" :key="project.path">
            <ProjectCard
              :project="{
                path: project.path,
                title: project.title,
                summary: project.summary,
                stack: project.stack,
              }"
            />
          </li>
        </ul>
        <NuxtLink
          to="/projects"
          class="mt-6 inline-block font-mono text-sm text-accent hover:underline"
        >
          All six projects &rarr;
        </NuxtLink>
      </section>
    </FadeIn>

    <FadeIn>
      <section class="py-10">
        <SectionLabel as="h2">Experience</SectionLabel>
        <ul class="space-y-6">
          <li
            v-for="entry in experience"
            :key="entry.role + entry.period"
            class="border-l border-line pl-5"
          >
            <p class="font-mono text-xs text-subtle">{{ entry.period }}</p>
            <h3 class="mt-1 text-base font-semibold text-ink">{{ entry.role }}</h3>
            <p class="text-sm text-accent">{{ entry.org }}</p>
            <p class="mt-1 max-w-xl text-sm leading-relaxed text-muted">{{ entry.note }}</p>
          </li>
        </ul>
      </section>
    </FadeIn>

    <FadeIn>
      <section class="py-10">
        <SectionLabel as="h2">Skills</SectionLabel>
        <ul class="grid gap-6 sm:grid-cols-2">
          <li v-for="group in skills" :key="group.group">
            <h3 class="mb-2 text-sm font-semibold text-ink">{{ group.group }}</h3>
            <ul class="flex flex-wrap gap-1.5">
              <li
                v-for="item in group.items"
                :key="item"
                class="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted"
              >{{ item }}</li>
            </ul>
          </li>
        </ul>
      </section>
    </FadeIn>
  </div>
</template>
