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

**Figure 1: Screenshot of a first (working) version of the prototype**

Now on to the nitty-gritty part of this post.

Since the game is a traffic simulation, it is essential that we can quickly create new traffic situations for users to experience. To do this, we went with a modular system where we could quickly slap different road segments next to one another, and our trafficManager would know how to deal with it.

For the prototype we limited ourselves to one road type: A two lane road with cycling lanes on either side as well as a wide curb. With this in mind, we managed to distill the bulk of traffic situations down to a tileset containing only six different segments.

**Figure 2: Whiteboard sketch of the six road segments we would need.**

The plan was to build up these six segments up from tiny tiles made in 3DS Max, and then piece them together in Unity. I built all of the mini tiles, textured and exported them. However, when we put them together in Unity, it quickly became obvious that this wasn't ideal: It turned out to be a huge undertaking to set up prefabs for each of the segments we needed, it flooded our scene hierarchy, and more importantly, that there were visible seams in between the various mini segments.

**Figure 3: The entire set of mini tiles, shown in 3DS Max.**

So that was the end of the mini tiles. We immediately decided that I would instead build the six segments directly in Max. This would allow me to optimize them too. The optimization lowered the vertex count from ±600 vertices to around 200 on complex pieces, and to only 34(!) on straight segments.

Considering that the city we made ended up using around four hundred straight road segments, it was time well spent!

**Figure 4: The finalized road segments.**

My next problem was a finicky one: I hadn't made each segment exactly the same size. They were all around 30 units by 30 units, but when snapped to one another in Unity, you would see large seams between each segment. The solution was the obvious one: Make them –exactly- 30 units in Max, then re-export them. It was a simple fix in the end, but it took a long time to actually verify and correct the positions of all of the vertices in all of the models.

**Figure 5: Big seams in snapped-together road segments.**

After this fix things looked good and it was now easy to build up a road network. Remco had set waypoints into each of the road prefabs, and by just duplicating a segment and having it next to another segment, cars knew where to go and how to get there. The rest of my time was spent actually building the city.

Of course there will be more adjustments to be made in the roads along the way, and I'm pretty sure I'll have to revisit all this again when we add more road types. But we have all of the things we need to finish the prototype, and I'm sure it'll be great!

To be continued.

**Figure 6: A birds eye view of the city**
