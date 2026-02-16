---
title: "Alpha's art process"
date: "2017-02-18"
author: "Wilco Van Starrenburg"
excerpt: "We've been talking a lot about how all of the tech for Alpha works, but haven't gone into detail what the Alpha art process looks like."
tags: ["Alpha", "art", "game-design"]
featuredImage: "/blog/_featured/alpha-art-process.png"
---

We've been talking a lot about how all of the tech for Alpha works, but haven't gone into detail what the Alpha art process looks like. You know, why Alpha looks the way it does, and how we made it. So this post aims to shed some light on the topic.

A lot of the choices we make at Jagaco (as with most companies) are influenced by how many man hours they will cost. We're a small studio with a single artist, so we're limited on the amount of man hours we can spend on art.

#### Our chosen perspective

While normally Isometric perspective is very time-consuming to draw and animate, we chose to go with exactly that for Alpha. This was the still go-to choice because we had previously worked on Ungoverned Lands (our RTS), and already had a working art pipeline for it. Additionally, our engine and editor tooling were already optimized for 2D isometric art, so we wouldn't have to re-create any of it. Additionally, the game mechanics didn't require any specific view to work well so this made it really an easy choice, as anything else would double the workload of our programming department.

#### Art style

The actual art style itself wasn't chosen to be cost-effective. The short version is that I'm just very confident in my ability to produce boatloads of art assets and keep them all consistent in style and of similar quality.

What you may have noticed that we mostly flat shade our characters and props, this was in order to keep every little thing on the screen recognizable as what it is. Dozens of dithers, gradients, weathering patterns and decals would clutter the screen with what we deemed to be unnecessary information.

Coloring and shading our characters like this also meant that animations could be flipped around. This literally halves the amount of animations in the game, and is thus a choice that makes the game run a lot smoother.

#### Animations

Most animations in Alpha of people are rotoscoped. This, again, is an efficiency 'trick' that has saved us hundreds of hours. With the animations roughly traced from motion-captured people, they naturally look natural and smooth (punny).

The main difficulty then becomes making sure each frame flows smoothly into the next one, which is something that can be a big issue when you're doing pixel art with this few pixels to work with. You tend not to have enough pixels to get all of the subtlety of a small movement rendered out (like swaying of arms during an idle animation), so you end up with only a few pixels moving every frame. This can make the whole thing look very static. I've often gotten around this by making the movement bigger, but this in turn makes it look like the character is dancing... Which wasn't entirely the result I intended. :)

The opposite can also be a problem. All of our animations run at 10 frames per second. This makes it so that when you have an especially fast or big movement, important parts of the movement would fall 'in between' frames, in turn making the animation occasionally look choppy. I haven't found a good way to get around this aside from doubling the frame rate (double the work!).

#### Tile Based

We decided very early on that our levels had to be tile based. Again, our work on Ungoverned Lands meant we already had the tech and tooling for this. Being tile based in turn meant that we could make walls in sections that fit on a single tile. Below you'll see a set of wall sections that can create all of the rooms you'll see in Alpha. We've added doors, window types and other specialty pieces onto these basic sections to create a near infinite amount of different looking rooms.

And with that I hope to have given you some insight as to why Alpha looks this way, and how the art came to be. If you have any questions, or suggestions for follow-up blogs, don't hesitate to ask us in the comments section, on Facebook or Twitter!
