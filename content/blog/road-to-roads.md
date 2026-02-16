---
title: "Road to Roads"
date: "2016-11-26"
author: "Wilco Van Starrenburg"
excerpt: "Blog post about the art development of road sections for a virtual reality traffic simulation."
tags: ["art", "VR", "development"]
featuredImage: "/blog/_featured/road-to-roads.png"
---

We have recently started a Virtual Reality project with "Sophia Kinder Revalidatie" (children rehabilitation). In collaboration with Sophia we're making a traffic simulation which aims to teach (temporarily) disabled children and teenagers to safely participate in traffic in their mobility scooter, wheelchairs or bicycles.

The project consists of two main phases. Phase one consists of a short period in which we create a high fidelity working prototype. The second longer phase will add things like highways, traffic accidents you will have to safely navigate around and behaviors displayed by other traffic that sometimes occur in life.

## The Development Process

Since the game is a traffic simulation, it is essential that we can quickly create new traffic situations for users to experience. To do this, we went with a modular system where we could quickly slap different road segments next to one another, and our trafficManager would know how to deal with it.

For the prototype we limited ourselves to one road type: A two lane road with cycling lanes on either side as well as a wide curb. With this in mind, we managed to distill the bulk of traffic situations down to a tileset containing only six different segments.

The plan was to build up these six segments up from tiny tiles made in 3DS Max, and then piece them together in Unity. However, when we put them together in Unity, it quickly became obvious that this wasn't ideal: "It turned out to be a huge undertaking to set up prefabs for each of the segments we needed, it flooded our scene hierarchy, and more importantly, that there were visible seams in between the various mini segments."

## Optimization and Refinement

We immediately decided to build the six segments directly in Max instead. This allowed for optimization, lowering the vertex count from approximately 600 vertices to around 200 on complex pieces, and to only 34 on straight segments. Considering that the city ended up using around four hundred straight road segments, this optimization was time well spent.

The next challenge involved ensuring each segment was exactly the same size. They were all around 30 units by 30 units, but when snapped together in Unity, large seams appeared between each segment. The solution required making them exactly 30 units in Max and re-exporting them, which involved verifying and correcting the positions of all vertices in all models.

After this fix, things looked good and it became easy to build up a road network. Remco had set waypoints into each of the road prefabs, and by duplicating segments and placing them next to one another, cars knew where to go and how to get there.

## Conclusion

Of course there will be more adjustments to be made in the roads along the way, and revisiting this will likely be necessary when adding more road types. However, the team has all the components needed to finish the prototype.

To be continued.
