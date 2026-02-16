---
title: "Close to beta, some thoughts of a programmer"
date: "2014-11-17"
author: "Vincent Broeren"
excerpt: "You would think that at the end of a project motivation skyrockets. Unfortunately this is not true. The last steps are the hardest to take, let me explain.."
tags: ["Ungoverned Lands", "tech", "development"]
featuredImage: "/blog/_featured/close-to-beta.png"
---

## Why are the last steps so hard!?!

You would think that at the end of a project (close to beta) the motivation skyrockets because you can see the light at the end of the tunnel. Unfortunately this is not true. The last steps are the hardest to take, let me explain our pain.

I have heard this saying before: _"80% of the time goes to the last 20% of features in a project."_ This means the last 20% of features takes the largest amount of time (80% of the time) to finish. I have always thought this was a little exaggerated, but I'm starting to see the absolute truth in it. And it is not because we kept the hardest features for last or pushed the unpleasant features to the end. What makes it so difficult is that all systems are getting more and more connected. So making a little change forces you to test more and more subsystems to ensure their workings. If you have any programming experience I can hear you think "Unit-tests!", but for games where the interaction of the player is high, the automation of tests is much more difficult. So a lot of "play testing" is needed which sounds much more fun than it is. Trust me.

Motivation is not at its highest. To be honest, it is quite low right now. I think this is because of our slow progress and having to crush a few hard bugs. One example is the AI of the units. All parts, like unit movement, attacking moving enemies, attacking enemy structures, or defending our base work quite well separately. But integrating them and making smooth transitions between them is much, much harder than I thought. Some examples: units disappear, walk on places where they cannot walk (technically not possible in the core of the engine) or act like complete idiots when you send them into the enemy base. And because troop movement is one of the core features of an RTS, this subsystem should work flawlessly! I was tempted many times to cut the corners and take dirty shortcuts just to be done with some of the features, but that would not be true to our players. We want a NON-cheating AI, with only the same information as the player has. That is hard, but we made promises and we feel obliged to keep them. And we will!

One mistake I have made is telling people that we are nearly there (because feature-wise we are beyond the 80% mark). So friends and colleagues keep asking me "_Is it done yet?_". No, sadly it is not. Not because we are slacking off or because Remco and I are bad programmers (I hope), but because I should not have told people we are almost done.

Is there any hope? Yes there is! Progress is slow, but there is still progress. And we're heading in the right direction. Systems are slowly but surely falling in place and all the bits and pieces are coming together. Today, the units actually acted intelligently and not like mindless Ogres. It is nice to see a coordinated attack on the enemy base and -finally- see it fall.

Bear with us, we're doing our utmost best to deliver a fun game as soon as possible, but with a high standard of quality.
