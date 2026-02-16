---
title: "Crafting Beauty Through Limitations"
date: "2025-04-24"
author: "Vincent Broeren"
excerpt: "How indexed rendering and a strict 82-color palette creates visual consistency and artistic discipline in our pixel art RPG."
tags: ["Quinn's Quest", "art", "technology", "pixel-art"]
featuredImage: "/blog/_featured/crafting-beauty-through-limitations.png"
---

In our upcoming game, we've chosen to use a technique known as **indexed rendering**. In this post, I'll explain what indexed rendering is, why we use it, and how it empowers our creative process.

## What is Indexed Rendering?

First, let's clarify what it's not. Indexed rendering has nothing to do with index buffers commonly used in standard 3D rendering. Instead, it relates to how we handle **colour** at the final stage of rendering images to the screen.

Our game is built in the style of **pixel art** and when we say that, we take the *art* part seriously. We've committed to strict visual constraints, using a carefully curated palette of just **82 colours** across the entire game. That includes characters, environments, visual effects, and the user interface. Every pixel you see adheres to that limited palette.

We took inspiration from another famous game, [Wargroove](https://wargroove.com/palette-swapping/).

## Why Use Indexed Rendering?

This isn't just a stylistic choice, it's a way to empower our creative process. As [Orson Welles](https://en.wikipedia.org/wiki/Orson_Welles) once said, *"The enemy of art is the absence of limitations."* Similarly, [Walter Gropius](https://en.wikipedia.org/wiki/Walter_Gropius) observed, *"Limitation makes the creative mind inventive."* These principles resonate deeply with our approach. By embracing constraints, we aim to unlock creativity and achieve visual cohesion that is both striking and purposeful.

Working with such a limited palette brings challenges. Most modern tools don't enforce strict palette adherence, which makes it easy to accidentally introduce "out-of-bounds" colours. For example, a semi-transparent pixel over another might blend into a colour outside our defined set.

To solve this, our asset pipeline automatically **converts every visual asset** into a format that uses only indexed colours from our palette. Here's how it works:

- The original artwork created by our artists is processed (left image).
- Each pixel is matched to the nearest colour in our 82-colour palette.
- Any out-of-bounds colour is flagged by replacing it with a bright red warning tone, which is clearly visible in previews.
- The resulting indexed image (right image) uses greyscale values to represent colour indices, referencing our palette.

![Indexed Rendering Comparison](../../public/blog/crafting-beauty-through-limitations/Blogpost-Image1.png)

The entire game screen is rendered using these indexed colours. Then, through a shader in our post-processing pipeline, we translate those indices back into actual colours using the palette at almost no runtime cost at all.

## The Benefits

This technique offers several powerful advantages:

- **Consistency**: Every visual on screen adheres to the same artistic rules.
- **Efficiency**: Changing a single colour in the palette instantly updates every asset that uses it, so there is no need to manually edit thousands of files.
- **Control**: It reinforces artistic discipline, helping us maintain visual integrity throughout the game.

This technique helps us build a world that feels hand-crafted, cohesive, and artistically rich. Constraints, far from being limitations, become the framework that allows creativity to thrive.

## Rendering With Purpose

By adopting indexed rendering, we're embracing a creative discipline.

This approach demands thoughtfulness. It requires us to consider every pixel, every shade, and every visual effect with intention, as pixel art is intended. The limited palette doesn't confine us; it **focuses us**. It pushes us to ask not just *"Can we?"* but *"Should we?"* when it comes to visual choices. That mindset is at the heart of great art.

Indexed rendering becomes a kind of creative contract, a reminder that beauty often emerges not from abundance, but from restraint. It's a technique that enforces consistency, protects artistic integrity, and ensures that every frame of the game reflects the same visual language.

Just as a poet finds power in the right words and a composer in the right notes, we as game developers find expression through deliberate limitations. And with indexed rendering, we're staying true to the spirit of pixel art.

In the end, our goal is simple: to craft a game world where every visual detail feels intentional, cohesive, and beautiful. Indexed rendering is one of the ways how we make that goal possible.

Stay tuned for more behind-the-scenes insights as we continue shaping our game's unique visual identity.
