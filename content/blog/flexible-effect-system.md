---
title: "Flexible shaders (or effects?)"
date: "2016-07-29"
author: "Vincent Broeren"
excerpt: "Writing a flexible effect system can be challenging, especially when you have to support multiple render APIs with the least amount of work for your artists"
tags: ["tech", "graphics", "shaders"]
featuredImage: "/blog/_featured/flexible-effect-system.png"
---

Our engine is used in a commercially applied game (Alpha), but as a programmer I know where the code can use some more love. Most important is of course that the code base is stable (which it is!), but our shader system was mostly hard coded. As a programmer that's something that keeps me awake at night, so it was time to put it on the planning and fix the problem.

## Different versions

One of the challenges was that we have to support at least DX9 and DX11 (besides OGL versions) and we wanted a system that could translate DX9 effects to DX11 and vice versa (preventing us from writing the same shader in different versions). The effect system can lexicographical analyze an input string and build an Effect from it. That Effect class holds all the information so the run-time system can compile the Effect to an API specific Effect (DX9 or DX11).

## Another challenge

When the loading part was done I could start testing the usage of the new system, and that opened a whole new set of challenges. Without knowing we build the hard coded 'effects' as shaders instead of Effects. So the whole graphics part of the engine was relying on vertex and pixel (fragment) shaders instead of an Effect which has (multiple) shaders in it. There was no way of telling the renderer which technique to use of the given Effect because it always assumed there was only one vertex and pixel shader program.

## Round up

It is done and I can sleep comfortably again (for now). Changing the Effect system to a fully flexible one made me touch every part of the graphics subsystem of the Fire engine, but it was worth it. The saying "Flexibility comes at the cost of simplicity" doesn't go here, because the system now enables us to write the Effects when and where ever we want them. Making it a lot easier to use.

To the next challenge…
