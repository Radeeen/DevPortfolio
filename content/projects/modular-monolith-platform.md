---
title: Modular Monolith Platform for Government Internal Operations
summary: A nine-module Laravel platform running the internal operations of DPR RI — built and maintained in production across eleven databases.
date: 2026-03
tags: [fullstack]
role: Fullstack Developer
team: Cross-functional team working in Agile sprints
stack: [Laravel 12, PHP 8.2, Vue, MySQL, Tailwind 4, Vite 7]
metrics:
  - value: "9"
    label: Functional modules
  - value: "141"
    label: Service classes
  - value: "11"
    label: Database connections
  - value: "122"
    label: Migrations
featured: true
confidential: true
---

## Context

DPR RI's internal operations span several working units, each with its own
processes, data and reporting requirements. Building a separate application per
unit would multiply the maintenance burden; building one undifferentiated
application would produce a codebase nobody could safely change.

I work on the platform that resolves that tension: a single Laravel application
split into nine functional modules, each owning its own controllers, services,
models, migrations and frontend assets, while sharing one authentication layer
and one deployment.

## My role

I develop and maintain fullstack features across the platform — building
RESTful APIs and the Vue interfaces that consume them, translating written user
requirements into tested features, and diagnosing performance and reliability
problems in existing modules. I work in sprints with a cross-functional team,
taking part in planning and code review.

## Approach

The architecture is a modular monolith, which keeps the operational simplicity
of one deployment while enforcing boundaries in the codebase.

- **Module isolation.** Each of the nine modules carries its own MVC stack.
  Modules are enabled per environment, so a developer can boot only the module
  they are working on.
- **A mandatory service layer.** Controllers stay thin — they validate, delegate
  and respond. All business logic lives in service classes, of which the
  platform now has 141. This is what makes the code testable and what stops
  controllers from growing into the usual thousand-line problem.
- **Validation at the edge.** Every write path goes through a FormRequest class
  rather than inline validation, so rules live in one place per operation.
- **A shared base model.** Database connection selection and audit columns —
  who created a record, who last changed it, and when — are handled by Eloquent
  lifecycle hooks on a base model rather than repeated in every model.
- **Server-side data tables.** Listing screens paginate, sort and search in the
  database rather than loading full tables into memory, which keeps response
  times flat as data grows.

Eleven separate database connections keep each unit's data physically separated
while a single application serves them all.

## Result

The platform is in production, serving internal operations across nine working
units: 309 controllers, 397 models and 1,370 Blade templates, on Laravel 12 and
PHP 8.2 with a Vite 7 and Tailwind 4 frontend build.

The architectural payoff is measurable in how the code is added rather than in a
runtime figure. A new feature touches one module's directory. A developer new to
a module reads that module. Nothing in the other eight can silently break.

## What I'd do differently

> The 141 service classes are the strongest part of
> the design and also where the next problem will appear — some now carry
> responsibilities that belong to dedicated action or query classes. If I were
> starting again I would set a stricter rule about what earns a place in a
> service, and add module-level automated tests earlier, so that boundaries are
> enforced by the test suite rather than by convention.
