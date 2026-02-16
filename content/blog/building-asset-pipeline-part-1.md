---
title: "Building an asset pipeline (Part 1)"
date: "2016-08-29"
author: "Remco Brilstra"
excerpt: "An asset pipeline is the workflow used to get models, textures and sounds from Digital Content Creators like Photoshop and 3DS Max into your game."
tags: ["tech", "tools", "development"]
featuredImage: "/blog/_featured/building-asset-pipeline-part-1.png"
---

## What is it and why do I want one?

An asset pipeline represents the workflow for transferring models, textures, and sounds from Digital Content Creators (DCCs) like Photoshop and 3DS Max into your game. During development, this process significantly impacts productivity.

## Why You Need an Asset Pipeline

Game development involves countless assets: textures, animations, UI elements, levels, atlases, shaders, and 3D models. Each type originates from specialized DCCs optimized for editing rather than runtime performance.

Most DCCs use proprietary formats (PSD, MAX, DAE) designed to support comprehensive editing features. However, game runtime environments require different priorities: fast loading, memory efficiency, and performance optimization. This disconnect necessitates a conversion process.

As multiple team members continuously modify assets simultaneously, checking them into the game becomes repetitive. The asset pipeline automates this transformation, allowing artists to work in their preferred tools without worrying about technical constraints.

## What is an Asset Pipeline?

"It's a standardized way of handling asset from DCC's and how they are fed into the runtime game." This process can range from manual procedures to fully automated workflows. Automation removes technical barriers for artists, enabling them to select the best tools for each specific task rather than defaulting to a single standardized tool.

## Essential Pipeline Features

### Organize (Dependency Tracking)

The pipeline must understand all assets, their relationships, and interdependencies. This enables automatic regeneration of dependent assets when changes occur and allows removal of unused assets from final builds.

### Convert

This converts source assets from DCCs into runtime-compatible formats.

### Manipulate

This optional step modifies assets through operations like texture resizing, saturation adjustments, sprite-map construction using bin packing algorithms, or scene optimization. Requirements vary significantly by project and platform.
