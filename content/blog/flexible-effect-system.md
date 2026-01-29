---
title: "Flexible shaders (or effects?)"
date: "2016-07-29"
author: "Vincent Broeren"
excerpt: "Writing a flexible effect system can be challenging, especially when you have to support multiple render APIs with the least amount of work for your artists"
tags: ["tech", "graphics", "shaders"]
featuredImage: "/blog/_featured/flexible-effect-system.png"
---

# Flexible shaders (or effects?)

Our engine is utilized in a commercially released game (Alpha), but as a programmer I recognize areas where the codebase requires refinement. While stability remains solid, the shader implementation was largely hardcoded—an issue demanding attention.

## Different versions

A primary obstacle involved supporting multiple graphics APIs: DirectX 9 and DirectX 11, plus OpenGL variants. The team sought a system converting DX9 effects to DX11 and vice versa, eliminating duplicate shader coding. The effect system performs lexicographical analysis on input strings, constructing an Effect object containing necessary information for runtime compilation to API-specific formats (DX9 or DX11).

## Another challenge

Upon testing the new system, unforeseen complications emerged. The previously hardcoded effects utilized vertex and pixel shaders rather than proper Effect objects. The entire graphics subsystem depended on vertex and fragment shader programs exclusively, lacking any mechanism to specify which technique to employ from a given Effect, since it presumed only one shader program pair existed.

## Round up

The restructuring is complete. Refactoring the Effect system to be fully flexible required modifying nearly every graphics subsystem component within the Fire engine, proving worthwhile. The implementation now allows developers to create Effects freely, enhancing usability significantly. The new approach demonstrates that "flexibility comes at the cost of simplicity" need not always apply—in this case, enabling greater ease of use.
