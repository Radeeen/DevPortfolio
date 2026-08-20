---
title: Sentiment Analysis of DPR RI Social Media, with a Green Computing Lens
summary: Comparing Extra Trees against Random Forest on 2,841 public comments — and measuring what the extra accuracy actually costs in energy and time.
date: 2025-06
tags: [data-ml]
role: Solo — undergraduate thesis research
stack: [Python, scikit-learn, Sastrawi, Pandas]
metrics:
  - value: "2,841"
    label: Comments collected
  - value: "92%"
    label: Extra Trees accuracy
  - value: "2.75×"
    label: Faster with Random Forest
  - value: "0.62"
    label: Macro F1 — the honest number
featured: true
confidential: false
published: JUSTIN — Jurnal Sistem dan Teknologi Informasi (2026)
---

## Context

Public commentary about DPR RI is spread across social platforms and moves far
faster than any manual review can follow. For my undergraduate thesis I asked
whether classical machine-learning models could classify that sentiment
reliably enough to be useful — and, unusually for the question, what running
them actually costs.

I collected **2,841 comments: 1,041 from TikTok and 1,800 from YouTube**, then
compared two ensemble classifiers, Extra Trees and Random Forest, on both
accuracy and energy consumption.

## My role

I did the research end to end: collection, preprocessing, model comparison,
energy measurement, and writing. The resulting paper — *Analisis Sentimen
Media Sosial Terhadap DPR RI: Perbandingan Akurasi Extra Trees Dan Random
Forest Dengan Pendekatan Komputasi Hijau* — was published in JUSTIN (Jurnal
Sistem dan Teknologi Informasi, Universitas Tanjungpura) in 2026, co-authored
with A. Aradea.

## Approach

Indonesian-language text needs its own preprocessing pipeline — case folding,
cleaning, stopword removal and stemming with Sastrawi — before any model sees
it. Both classifiers were then trained on identical features so the comparison
was fair.

The part I care about most is the second axis. Rather than reporting accuracy
alone, I measured energy consumption and wall-clock processing time for each
model, so the comparison reflects what running them actually costs.

| | Extra Trees | Random Forest |
| --- | --- | --- |
| Accuracy | 92% | 90.3% |
| Macro F1 | 0.62 | 0.53 |
| Energy consumed | 0.0248 kWh | 0.0213 kWh |
| Processing time | 22 min | 8 min |

## Result

Extra Trees is the more accurate model, by 1.7 percentage points. Random Forest
is the cheaper one — less energy, and **2.75× faster** to process the same data.

Neither is simply better. The finding is that the right choice depends on what
is being optimised: where accuracy governs, Extra Trees wins; where the model
runs repeatedly and energy or latency matters, Random Forest gives up very
little for a substantial saving. Stating that trade-off explicitly, rather than
reporting the higher accuracy figure and stopping, was the point of the study.

## What I'd do differently

> The dataset is heavily imbalanced — the neutral
> class dwarfs both negative and positive. A model that answered "neutral" every
> single time would score around 91%, which means headline accuracy flatters
> both classifiers, and it is why macro F1 sits at 0.62 and 0.53 while recall on
> the negative class is only 0.21. Accuracy was the wrong headline metric for
> this data. I would rebalance with class weighting or SMOTE, evaluate on macro
> F1 from the start, and report per-class recall rather than letting a single
> aggregate number carry the conclusion.
