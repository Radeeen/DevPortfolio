---
title: Parliament Building Navigation Map
summary: An interactive 3D navigation map of the DPR RI complex, with location search and fastest-route selection between buildings.
date: 2024-03
tags: [fullstack]
role: Solo — internship project
team: DPR RI, MSIB internship programme
stack: [Unity 3D, Blender, Figma, C#]
metrics: []
featured: false
confidential: false
demo: https://www.behance.net/gallery/228053885/Parliament-Navigation-Map
---

## Context

The DPR RI complex is large and made up of many buildings. Visitors and staff
who know the destination's name often do not know how to reach it, and static
signage only helps once you are already close.

## My role

Solo: 3D modelling, mapping logic, route-finding implementation and interface
design.

## Approach

The work ran in five stages.

- **Mapping** the complex layout and the connections between buildings
- **3D building design** in Blender, producing the models the map renders
- **Route and description making** — defining the paths between locations and
  the descriptive text attached to each destination
- **Implementation** in Unity 3D, integrating the models with the search
  interface and a route-selection algorithm that returns the fastest path
- **Demo** to stakeholders

The map works at two scales. Outdoor mode routes between buildings across the
complex; indoor mode continues the route inside a building, down to the room.

![Outdoor routing to Gedung Nusantara 3, showing turn-by-turn directions and a magenta route line across the 3D complex](/img/projects/navigation-outdoor-route.webp)

Each route returns turn-by-turn directions in plain Indonesian — "lurus sejauh
45m", "belok kanan sejauh 267m" — with total distance, walking time and an
energy estimate. The 312m route above resolves to four minutes.

![Indoor routing to the Bamus room, with the route drawn through corridors inside the building](/img/projects/navigation-indoor-route.webp)

Indoor mode was the harder half. Between-building routing is a graph over open
space; routing inside a building means modelling corridors, stairwells and
doorways as traversable and everything else as not.

## Result

An interactive 3D map where a user searches for a destination by name and gets
the fastest route to it rendered in three dimensions — continuing indoors to
the specific room — rather than a floor plan they have to interpret themselves.

## What I'd do differently

> The map is a standalone Unity application, which
> means reaching it requires installing something — a real barrier for the
> visitors it was built for. Today I would build it for the web so that it opens
> from a QR code at the entrance, and validate the routes with people who do not
> already know the building.
