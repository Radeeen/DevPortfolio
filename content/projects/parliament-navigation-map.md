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

## Result

An interactive 3D map where a user searches for a destination by name and gets
the fastest route to it rendered in three dimensions, rather than a floor plan
they have to interpret themselves.

> **What I'd do differently.** The map is a standalone Unity application, which
> means reaching it requires installing something — a real barrier for the
> visitors it was built for. Today I would build it for the web so that it opens
> from a QR code at the entrance, and validate the routes with people who do not
> already know the building.
