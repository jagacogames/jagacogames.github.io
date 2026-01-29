---
title: "Procedural Dungeon Generation"
date: "2016-12-18"
author: "Thom Zeilstra"
excerpt: "For the Action-RPG Quinn's Quest, the developers implemented a system for procedurally generated dungeons featuring rooms for exploration, combat, and treasure collection."
tags: ["Quinn's Quest", "tech", "procedural-generation"]
featuredImage: "/blog/_featured/procedural-dungeon-generation.png"
---

# Procedural Dungeon Generation

## Procedural Dungeons

For their Action-RPG game Quinn's Quest, the developers created procedurally generated dungeons containing explorable rooms where players can fight and gather loot. The dungeon features an entrance room (green), an exit room (red) positioned as far as possible from the entrance, and hidden rooms accessible through secret passages. Using seed-based generation allows for nearly infinite unique dungeon variations.

## Triangulation

The generation process begins by creating rooms with random positions and sizes while preventing overlaps. To determine room connections, the system uses Delaunay triangulation based on room positions. This ensures "the circumcircle of the three rooms shouldn't contain any other room."

The algorithm starts with one large overlapping triangle. As each room is added, the system identifies which triangle contains it, creates three new triangles by connecting the room to the original triangle's vertices, and checks neighboring triangles. When necessary, edge flips occur if angles exceed 180 degrees.

## Minimal Spanning Tree

The minimal spanning tree calculation determines the minimum connections needed for complete dungeon connectivity. The developers intentionally added randomness to allow additional room connections, creating loops and reducing dead-end sections. This design choice makes dungeons more enjoyable since players don't constantly backtrack.

## Corridors

Initial Manhattan-style corridors appeared unattractive and ran too close to rooms. Extending room exits before applying Manhattan connections produced superior results with naturally-positioned corridors. Grouping corridors by connection identifies which rooms link together, facilitating both 3D model creation and efficient vertex buffer management.
