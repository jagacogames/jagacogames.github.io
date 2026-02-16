---
title: "Alpha's art process"
date: "2017-02-18"
author: "Wilco Van Starrenburg"
excerpt: "We've been talking a lot about how all of the tech for Alpha works, but haven't gone into detail what the Alpha art process looks like."
tags: ["Alpha", "art", "game-design"]
featuredImage: "/blog/_featured/alpha-art-process.png"
---

We've been discussing the technology behind Alpha extensively, but the visual development deserves equal attention. This post explores the artistic decisions and production methods that shaped Alpha's distinctive appearance.

## Perspective Selection

The team opted for isometric perspective, a choice grounded in practical efficiency. Since Jagaco had previously developed Ungoverned Lands using this viewpoint, the existing art pipeline and optimized engine tools could be repurposed. The game mechanics didn't require a specific camera angle, making this decision straightforward and preventing unnecessary duplication of work across departments.

## Visual Style

The artistic approach wasn't primarily driven by cost concerns. The studio's confidence in producing numerous consistent assets influenced this direction. Characters and props employ flat shading rather than complex texturing—avoiding dithering, gradients, and weathering details that would clutter the screen with superfluous visual information. This approach also enabled animation flipping, effectively reducing the animation workload by half and improving overall performance.

## Animation Techniques

Most character animations utilize rotoscoping, derived from motion-captured footage. This efficiency-focused method naturally produces smooth, believable movement while saving hundreds of production hours.

However, challenges emerge at the pixel level. At 10 frames per second, subtle movements lack sufficient pixels for detail rendering, sometimes producing static-looking results. Conversely, large movements occasionally appear choppy when key frames fall between animation steps.

## Tile-Based Level Design

The decision to use tile-based levels leveraged existing technology from prior projects. Wall sections fit individually on tiles, creating modular pieces that combine to form varied rooms. By incorporating doors, windows, and specialty segments, the team generates nearly limitless room configurations from a limited asset set.
