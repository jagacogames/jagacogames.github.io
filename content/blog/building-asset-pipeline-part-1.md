---
title: "Building an asset pipeline (Part 1)"
date: "2016-08-29"
author: "Remco Brilstra"
excerpt: "An asset pipeline is the workflow used to get models, textures and sounds from Digital Content Creators like Photoshop and 3DS Max into your game."
tags: ["tech", "tools", "development"]
featuredImage: "/blog/_featured/building-asset-pipeline-part-1.png"
---

## What is it and why do I want one ?!

An asset pipeline is the workflow you use to get the models, textures and sounds (among others) from your Digital Content Creators (DCC) like Photoshop, 3DS Max or Audacity to your game. During game development a lot of time can be lost in the production workflow you use. An important part of that workflow is the Asset pipeline, at Jagaco we spent a lot of time tweaking and improving it.

In this series of blog posts I'll be explaining what issues we're trying to solve and how we went at it and what we did wrong.

## An asset pipeline, Why do I want one ?!

When you are creating a video game, you are working with an enormous amount of 'assets'. Things like: Textures, Animations, UI, Levels, Texture Atlasses, Shaders, (3D)Models, Material definitions and there are most likely some more that I'm forgetting. Essentially everything that makes a game (ex. Source-code) is an asset and every one of these files is created in a DCC (Digital Content Creator) that is optimal for that specific type of asset (Such as Photoshop for textures or 3DS Max for 3D models).

Most of these DCC's have their own file formats, which are usually optimized to support any feature that might exist in the DCC and best support the editing of these files. Most of the time these optimizations are at the cost of load-time performance and memory usage, which aren't very important when working on the assets. When you are running your game however your priorities are different, you want to load resources quickly, efficiently and you want them to use as little memory as possible.

This means that in most cases the DCC formats (eg. PSD,MAX,DAE) although very useful during asset creation are not the format you want to use 'runtime'.

During the development of a game, continuous changes will be made to the assets by multiple people simultaneously. These people will want to check out their assets in the game to make sure that their changes look/work the way they envisioned. They might add a mesh with a few textures to a scene etc. As this is a process that gets repeated a lot, you want to make sure that they have to do as little as possible (preferably nothing) to get from their DCC assets to some format that the running game supports. This is where the asset pipeline steps in.

## What is an asset pipeline?

Asset pipelines come in all shapes and sizes, about which I will go into more detail in the next post. One could argue that a post-it stating "Export textures to .png and save them in projectname/assets/textures, then run game" would be an asset pipeline albeit a somewhat manual one.

As you can imagine once the amount of tools used gets bigger and the size of the artist team grows, using this asset pipeline you might be forced to hire a full-time post-it writer. Some might consider that a waste of resources…

But in essence that is it, **it's a standardized way of handling asset from DCC's and how they are fed into the runtime game**. This process can be automated in order to not bother the artists with any of the technical restrains imposed by the run-time systems, however the extend of this automation differs greatly per solution.

An added bonus of automating this workflow is that it gives (when supported) artists more freedom to use the DCC that is best for the job. In some cases it might be that your default modelling tool (Tool A) isn't ideal for some animation work that needs to be done, but Tool B is. When a you are using the post-it system that artist might be inclined to use tool A anyway being less productive as a result. Simply because there is no process in place for handling the assets created by tool B (and the post-it writer is already drowning in work).

A sufficiently advanced automated pipeline can remove these problems for your artists allowing them as productive as possible and always use the best tools available.

## What an asset pipeline needs?

*Note: If you are working with an off-the-self engine chances are that it comes with at least part of the asset pipeline in place and in most cases you won't have to look any further. Note that there is not a fixed set of features that every pipeline supports. The descriptions of features in this article are based on our implementation in the [Fire Engine](http://jagaco.com/tech/). This might differ for the engine you are using.*

Now the post-it system as describe above might be acceptable when you just have edited a single asset and want to check it out in-game, however what happens when you just changed 10 (which one did I change again?), what if one of these assets was a mesh that is in 5 scenes that now need their shadow re-baked. As you can imagine it gets harder and harder to keep track of the changes you made and what steps need to be taken to get your assets ready.

To prevent any issues with this we distilled the following features that should be in our pipeline:

### Organize (dependency tracking)

The pipeline needs to know all the assets that together form your 'asset library', the complete collection of assets that will create your game. It should also be able to understand all the file-formats you're throwing at it. This way it will know that 'SceneX' contains 'ModelY' which on it's turn uses 'TextureZ'.

This is what we call dependency tracking, which is very important if you want to optimize the performance of your pipeline and decrease clutter in your final builds. If, for example, you were to make changes to 'TextureZ' the pipeline could detect that this also invalidates some reflection maps that are used in 'SceneX' which can then be automatically regenerated. Or if you were to remove 'ModelY' from 'SceneX' the pipeline could use its dependency graph to conclude that 'TextureZ' isn't used anymore, and exclude it from the final build saving valuable disk space and possibly graphics memory as well.

A final example of something that we at Jagaco run into a lot is the following. Our pipeline is used to pack textures into sprite-maps, when you change an asset that is part of a sprite-map this will trigger the pipeline to automatically repack the sprite-map which saves us loads of time but mostly a lot of frustration.

### Convert

Part of the pipeline is the conversion of assets, as already discussed. This step is responsible for the conversion between source asset from a DCC (Photoshop,3DS max, etc.) to asset formats that we want to use.

### Manipulate

Now this is as they say where the magic happens. Asset manipulation is a step that can be executed multiple times on a single asset.

Manipulating operations can be as simple as resizing a texture, changing the saturation on a texture, constructing sprite-maps using [Bin Packing](https://en.wikipedia.org/wiki/Bin_packing_problem) or optimizing the spatial partitioning of a scene. The possibilities here are endless and requirements will usually differ greatly per project/platform.

Now this is a pretty high-over description of what a Asset pipeline should/could do, and i hope its gives you a general idea about why game development cannot happen without one. As always the devil is in the details therefore i'll get down to the nitty-gritty in the next installment of this series.
