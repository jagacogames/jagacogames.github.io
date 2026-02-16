---
title: "How to Workflow"
date: "2021-04-10"
author: "Vincent Broeren"
excerpt: "Development lessons from our new RPG project—best practices for indie game development including demos, systems, and perseverance."
tags: ["technology", "game-development", "workflow"]
---

### Work in demo's (incremental)!

Remco came up with this and it is paramount to our progress. It may sound so simple, but this project is our first where we are working in this way. A pitfall most projects suffer from is that particularly hard bugs are 'saved' for the future. If I can do one thing in a weekend do I pick that one cool new feature to add to the game, or do I pick that nasty difficult bug to tackle? Too often the first one is picked (also by me). But forcing ourselves to work in demo's also forces us to tackle those nasty bugs early on. A demo should be a horizontal slice of the game systems and give a general **polished** experience to the player.

And polished means there cannot be bugs in the demo, which means we need to tackle all known bugs to be able to finish the demo before we can proceed to the next. And as always be careful for feature creep, especially near the end of a demo. You tend to want to add a cool new feature instead of working on the stuff that still needs to be done for the demo, but that's not the point of having incremental demo's!

### Focus on game systems

Focus on game systems first and content later. In our demo's we didn't only focus on the content or the systems of the game, but we alternate between them. Every odd demo (1, 3, 5, etc.) we add new game systems and every even demo (2, 4, 6, etc.) we add content that uses those new systems. Off course we add minimal content while developing the game systems, because you need to use them to know if they work. But don't get too distracted from the systems themselves by adding tons on content.

An example is our quest-system. Keeping track of all quests, prerequisites, linked NPC's, etc. is a daunting task. We created a flexible quest-system with a quest-manager to keep track of all of that. To "test" the system and to progress the story of the game we add main story line quests to use the quest-system and see if it works and does everything we want it to. But we don't add many side-quests, because we can easily add those in the next demo when the quest system has matured in the previous demo. This goes for all other systems too like shops, inventory, crops, combat, etc. Start with the bare minimum and flesh them out in the next demo.

### Having a story beforehand

Having a story beforehand makes you ask other questions during development. Our new game project is a Role Playing Game. And the most important part of a RPG is its story. Long before we started this project I started with writing the story and developing the world and the characters in it. This took multiple years, but was done in the "down time" during other projects. Many weekends and nights were spend to progress the story arc further and fleshing out the protagonist, deuteragonist and the antagonist. Giving the main characters depth and meaning in the whole story.

Knowing beforehand where the story was going greatly helped us to develop the game. And hopefully will give the player an immersive feeling while playing the game. We noticed that we started to ask different questions when we were discussing particular parts of the Game Design Document. As a programmer I tend to ask the "how" question. *How* will the fight go on? *How* will an attack hit? *How* should the enemy animate?

But having a story (which we all read in the beginning of the project) we started to ask other questions: *Why* are we fighting him? *Why* does the enemy have a steel sword? *Why* are we on the second floor of this building? *Why* should a hit do that amount of damage? Being able to ask those questions with the story in our minds helped us to give meaning to the encounters. It's not just running from fight to fight, but the battles help to evolve the story in the game.

The other questions we started asking were, can we add this enemy here? How many enemies should be in this cave? Is it canon to have that kind of enemy? But always keep in mind that reading a story on paper is something else completely from a game that you play. So when something looks great on paper but doesn't work in the game: change it!

### Our engine is maturing

Creating an engine from scratch with all of it's own tools (like editors) was a large undertaking, especially for a (small) indie-developer like us. But now that almost ten years have past and we worked diligently on our own tech over those years, we finally got to a point where we see that our engine is becoming mature enough to do some heavy lifting by carrying our new game. 95% of our time now is put into the game code, and changes to the engine are getting more sparse and smaller all together.

But we keep enjoying the benefits of having our own in-house engine! The last big change in the engine showed that. We have multiple path finding implementations in our engine, A* being the most used. But for our new game we wanted an upgrade. We were reading a lot about Jump Point Search and made the decision that we wanted that algorithm too (because of the big advantages over A*). Implementing the new algorithm was not that hard and adding it to the engine was even easier.

### Porting delayed

We currently support Windows and DirectX and WebGL, but we know we eventually need to support other "stuff" later on. Telling which "stuff" will give away too much of where we're heading, so I'll keep it vague. We discussed *when* we should port our engine and game to the desired platform(s) and decided to wait…

Only time will tell if this was the right decision, but our motivation to do this is as follows. Porting is tedious and we need to work in an "environment" in which we have zero to none experience. So developing a game *while* keeping an early port up-to-date would be dividing our attention between the two. Now we can first make sure the engine and the game are at a rather stable-state before we get into the large undertaking of porting them. Many studio's hire other specialized studios to do the porting for them, and some of those well known porting-studio's are even in The Netherlands, but where's the fun in that? (plus we cannot afford that at the moment)

### Fill your Game Design Document

A Role Playing Game is a large game project! Not only will it have many subsystems that will have to work together and needs to be balanced, but there should also be tons of content for the player to do, explore, kill, conquer, etc. Which in turn means a lot of decisions have to be made. And the joint-memory at Jagaco isn't that great. So we need to keep track of all those decisions made, the small and the big ones.

We use the Wiki on Azure DevOps to write down **everything** in our game design document (GDD). If you ever ask yourself the question "*Should that be in the GDD?*" the answer is always "*yes!*". And I can tell you it works! We have sections of stuff that we still have to discuss (e.g. new ideas) and we have sections which are "final" and it gives a great foundation to build the game on. We can find balancing problems early on, even before a single line of code is written for it. And when we start coding on one of the systems we only have to look in the GDD to see how that system should work.

### Always be tenacious

Even (or especially) when the bugs are tough! There is one example I want to talk with you about. In demo 1 we had a particularly hard bug in the traversing of a found path. When a character in the game wanted to move to a new location the path finder plans the shortest path for it. But walking along that path looked "off" and **sometimes** (in very rare occasions) the character would even get stuck.

First it took many hours to get a situation where the "getting stuck" bug would occur consistently (yay, for savegames!) and only then the actual hunt for the bug could start. Off course you first think there is a bug in the path finding algorithm. But it was already thoroughly tested and we even have some (non-automatic) unit tests for the path finder. So we could rule that culprit out.

It seemed to be in the 'interaction' of the character code with the found path. Normally you would simply put a break-point in the code and start debugging at some point, but every time I placed a break-point the error wouldn't occur. So it was probably a timing issue? Because debugging wasn't an option all I could think up was guess where the error was.

This took me well over a week to do, not full time behind my computer but full time in my head. When I was eating, I was thinking where the bug could be. When I was watching a movie on Netflix to get some distraction, all I could think off was that bug. I even had to pause some movies to try some new ideas, but to no avail. I will be honest with you, my motivation took a terrible hit because of this bug and too often I thought of simply giving up. But that would be the easy way out! And that bug wouldn't get the better of me! I was smarter than that bug and after three weeks my determination finally payed off and I found the issue.

The solution were only a few lines of code, but that's often with large bugs (the solution doesn't have to be large too). When you go low by hitting a dip, and eventually do win, you go up extra high and the feeling of victory was great! **Keep believing in your project (and yourself!) and your perseverance will prevail!**

---

If you have any questions about this post or Jagaco in general feel free to ask! For now have a great day, and happy coding.
