<script setup lang="ts">
const organisational = [
  {
    role: 'Vice Chairman',
    org: 'Generasi Baru Indonesia, Siliwangi University',
    period: 'Mar 2023 — Mar 2024',
    note: 'Oversaw programme delivery across all divisions and reported to Bank Indonesia on execution.',
  },
  {
    role: 'Head of Supervisory Commission',
    org: 'Badan Pengawas Organisasi HMIF',
    period: 'Jan 2023 — Dec 2023',
    note: 'Led oversight of the Informatics Student Association’s work programmes and reporting.',
  },
  {
    role: 'Head of Strategy and Advocacy',
    org: 'Informatics Student Association',
    period: 'Jan 2022 — Dec 2022',
    note: 'Represented student concerns to the department and ran the forums that collected them.',
  },
]

useSeoMeta({
  title: 'About',
  description:
    'Informatics graduate from Siliwangi University, fullstack developer at DPR RI, published in JUSTIN Vol 12.',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-14">
    <SectionLabel>About</SectionLabel>
    <h1 class="mb-6 text-3xl font-semibold tracking-tight">
      Fullstack developer, research-minded
    </h1>

    <div class="mb-12 space-y-4 leading-relaxed text-muted">
      <p>
        I am an Informatics graduate from Siliwangi University, now working as a
        fullstack developer on the internal systems of DPR RI — the House of
        Representatives of the Republic of Indonesia. Most of what I build is
        used by people who did not choose the software and cannot work around it,
        which is a useful thing to keep in mind while building.
      </p>
      <p>
        My route into engineering ran through data. My thesis compared two
        ensemble classifiers on Indonesian social media sentiment and measured
        what each one cost to run, which taught me to distrust a single headline
        metric — a habit that has been more useful in production work than any
        specific framework.
      </p>
      <p>
        I work in Laravel, Vue, Node.js and Python. I am based in Jakarta and
        open to fullstack and data roles.
      </p>
    </div>

    <section class="mb-12">
      <SectionLabel as="h2">Education</SectionLabel>
      <div class="border-l border-line pl-5">
        <p class="font-mono text-xs text-subtle">2020 — 2025</p>
        <h3 class="mt-1 text-base font-semibold text-ink">
          Bachelor of Engineering, Informatics
        </h3>
        <p class="text-sm text-accent">Siliwangi University — GPA 3.59 / 4.00</p>
        <p class="mt-1 text-sm leading-relaxed text-muted">
          Thesis: Sentiment Analysis of Social Media Regarding DPR RI — comparing
          Extra Trees and Random Forest accuracy with a green computing approach.
        </p>
      </div>
    </section>

    <section class="mb-12">
      <SectionLabel as="h2">Publication</SectionLabel>
      <div class="rounded-lg border border-line bg-surface p-5">
        <h3 class="text-base font-semibold text-ink">
          Analisis Perbandingan Metode Think-Aloud, Evaluasi Heuristik dan
          Cognitive Walkthrough untuk Evaluasi Usability pada Aplikasi Simpeda
        </h3>
        <p class="mt-2 font-mono text-sm text-accent">
          JUSTIN — Jurnal Sistem dan Teknologi Informasi, Vol 12 No 2 (2024)
        </p>
      </div>
    </section>

    <section class="mb-12">
      <SectionLabel as="h2">Awards</SectionLabel>
      <p class="text-sm text-muted">
        <span class="text-ink">Bank Indonesia Scholarship</span> — 2022 to 2024
      </p>
    </section>

    <section>
      <SectionLabel as="h2">Leadership</SectionLabel>
      <ul class="space-y-6">
        <li
          v-for="entry in organisational"
          :key="entry.role"
          class="border-l border-line pl-5"
        >
          <p class="font-mono text-xs text-subtle">{{ entry.period }}</p>
          <h3 class="mt-1 text-base font-semibold text-ink">{{ entry.role }}</h3>
          <p class="text-sm text-accent">{{ entry.org }}</p>
          <p class="mt-1 text-sm leading-relaxed text-muted">{{ entry.note }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
