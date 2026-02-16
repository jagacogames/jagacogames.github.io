---
title: "Custom depthbuffer"
date: "2016-12-12"
author: "Vincent Broeren"
excerpt: "By creating a custom depth buffer we utilize the full extent of our Spritebatch by drawing all the static objects in only one drawcall."
tags: ["Alpha", "tech", "graphics"]
featuredImage: "/blog/_featured/custom-depthbuffer.png"
---

Our Spritebatch rendering technique differs from the one in XNA and Monogame. We have used those before, but were unhappy with their performance. One of the problems with a Spritebatch is that render order is important because of the lack of a depth buffer (z-buffer). This blog is about our solution to this problem.

## Spritebatch

It is all in the name. The Spritebatch is used to batch the rendering of many Sprites to the screen. This is done because drawing many small items on the screen is more expensive then rendering a few larger ones. Because a Sprite is not much more than a quad in screenspace which consists of four vertices (two triangles) and a texture, a Sprite is one of the smallest things you can render at a time (a single triangle being the smallest). If you want to draw for example 100 Sprites on the screen and would do that one at the time that results in 100 draw-calls (100 x 4 vertices) and is much slower than making a few batches (e.g. five of them) and rendering those batches in only five drawcalls (5 x 80 vertices).

To be able to batch you need to collect the Sprites which use the same. To enable larger batches you can make a SpriteAtlas like in the image below. In this way more Sprites share the same texture.

## Render order

Because all the sprites are in screenspace there is no formal depth. Sure, you can use a few layers, but there is no 'real' depth. And because Entities are moving around in the scene the order in which Sprites are rendered is important to prevent all kinds of clipping issues (e.g. drawing a person on top of his desk instead of behind it).

The normal render order is from back to front, and because we have an isometric scene it is also from right to left as seen in figure 2.

The darker the image, the further away it is from the camera/player. In the image you can see a nice "gradient" from the upper right corner (darkest) to the lower left corner (lightest). This is a visualization of the normal render order in XNA and Monogame.

Now you might think: "Ok, then you render all the static objects in one drawcall and then draw all the moving Sprites after that". Well that doesn't work because you cannot intertwine the later drawn Sprites in between the Sprites that are already drawn. Resulting in rendering all the moving Sprites on top of the rest of the scene. So then you have to break up all of the batches to be able to "insert" the moving objects in between the static scene. And that is slow…

## Custom Depth buffer

To be able to intertwine a Sprite between existing ones (that are already drawn) you need to know its general depth in the scene relative to other Sprites. That way you know if a Sprite should be in front or behind the other one. This is a technique used almost all the time in 3D rendering, and we wanted it for our 2D rendering (Spritebatch) as well.

What we made is "a depth buffer to which we can write depth information per pixel basis (in the Fragment Shader of the Spritebatch)." On modern hardware it is possible to write to up-to four different channels in a single pass of the fragment shader. We write to the Color channel and the Depth channel in our Spritebatch shader. This costs us *nothing* extra, and by doing so we test the pixels on the depth buffer before writing to the Color channel. If a pixels fails its depth test, it will be discarded and will not show up on the screen. This is exactly the way to intertwine Sprites with each other.

In figure 3 you can see the custom depth buffer of the same scene as in figure 2. It is clearly visible that the gradient shifted from a right to left gradient to a top to bottom one, even in an isometric scene. Note that the floor seem to be missing, it is still there but it is drawn in *a single pass* (instead of one tile at the time) at a high depth so it is almost black.

## Conclusion

By creating a custom depth buffer we utilize the full extent of our Spritebatch by drawing all the static objects in only one drawcall and are still able to "insert" other Sprites in the scene without ever having to worry about clipping anymore. The cost of all this in runtime is close to zero, and the code (which we have to maintain) to enable this is rather elegant and not that large.

If you have any questions about this technique please don't hesitate to ask! We would love to talk about it some more.
