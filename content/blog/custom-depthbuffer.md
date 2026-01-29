---
title: "Custom depthbuffer"
date: "2016-12-12"
author: "Vincent Broeren"
excerpt: "By creating a custom depth buffer we utilize the full extent of our Spritebatch by drawing all the static objects in only one drawcall."
tags: ["Alpha", "tech", "graphics"]
featuredImage: "/blog/_featured/custom-depthbuffer.png"
---

# Custom Depthbuffer

## Spritebatch

The Spritebatch batches rendering of multiple sprites to improve performance. Drawing 100 individual sprites requires 100 draw-calls, whereas organizing them into five batches reduces this to just five draw-calls, significantly improving speed.

To enable larger batches, developers can use a SpriteAtlas—combining multiple sprites into a shared texture so more sprites can be rendered together efficiently.

## Render Order

Since sprites exist in screenspace without formal depth, their rendering order matters greatly. "The normal render order is from back to front" to prevent clipping issues like drawing a person on top of their desk instead of behind it.

In isometric scenes, this means rendering from upper-right to lower-left. However, a problem arises: static objects cannot be rendered in one batch if dynamic sprites need to be intertwined between them. Breaking up batches to insert moving objects ruins performance.

## Custom Depth Buffer

The solution involves writing depth information per pixel in the fragment shader. The system tests pixels against the depth buffer before writing color data. If a pixel fails the depth test, it gets discarded—allowing sprites to properly layer regardless of draw order.

This technique costs almost nothing performance-wise while enabling developers to "draw all the static objects in only one drawcall" while still properly intertwining dynamic sprites throughout the scene without clipping concerns.
