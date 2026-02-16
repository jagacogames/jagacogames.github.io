---
title: "The Temptation of Building the Perfect Editor"
date: "2025-05-08"
author: "Vincent Broeren"
excerpt: "The seductive nature of tool-building in game development and why sometimes 'good enough' is perfect."
tags: ["Quinn's Quest", "technology", "game-development", "tools"]
featuredImage: "/blog/_featured/the-temptation-of-building-the-perfect-editor.png"
---

**Game development is a strange mix of creativity, problem-solving and engineering.** There's always a new system to build, a bug to squash, a quest to write. But when you're creating a complex game, especially one with a richly detailed world, you often run into tasks that feel repetitive.

Place ten treasure chests. Adjust spawn areas for dozens of enemies. Set up conversations for every single villager in a town.

And that's when it happens:

> "I could create a (sub)editor for this."

It sounds harmless and even practical. A good tool can save time, reduce errors, and empower creativity. But there's a trap hiding in that well-meaning thought: **if you're not careful, you'll spend more time building tools than building the actual game.**

## **The Allure of the Perfect Tool**

Tool-building scratches a very satisfying itch, especially for me. It's clean, logical, and rewarding. It gives the feeling of progress even when it doesn't change the game itself directly. It's the promise to save time in the future that makes it so tempting.

I've fallen into that trap several times. During development, we've built editors for dialogue, scripting, item generation, animation, levels, and more. And all of these are necessary.

But when is an editor "good enough"?

There's a moment every developer recognizes: when a small task needs to be done a hundred times, and the idea of automating it seems like the best use of your time. Sometimes it is. Sometimes it's not. The danger comes when the tool becomes the project, and the game takes a backseat.

## **The Cost of Convenience**

Building a tool takes time. Good tools take a lot of time. And great tools? They're basically software products on their own. They need UI/UX, testing, documentation, flexibility, and upkeep. Suddenly, you're no longer making a game, but you're creating a game-making platform.

It's easy to justify: "If I just spend a day on this, it'll save me hours later."

But that only works if:

- You actually use it frequently enough to recover the cost.
- You don't spend three days making a perfect UI for something you'll use once.
- You don't get caught adding *just one more feature* to make it feel complete.

Every hour spent refining an editor is an hour not spent designing quests, polishing visuals, or writing the next great moment of our story.

## **When Tools Are Worth It**

Of course, we're not saying you should never build tools. Quite the opposite. **Good tools are essential**, especially in larger or content-heavy games.

Here's when we've found tool-building to be worth it:

- **For tasks done frequently** (e.g. placing assets in the world or creating animation-sheets).
- **When the task is error-prone** (e.g. compound assets or data "carriers" like resource-spawns).
- **When iteration speed matters** (e.g. quickly testing something out without a lot of overhead.).
- **When multiple team members benefit** (especially non-programmers).

In these cases, a tool can unlock creativity. All team members can create stunning levels for the game. Designers can tweak values and instantly see results. That kind of empowerment multiplies output across the team.

But the key is **balance**. The goal is to make the game, not to build a suite of perfect editors.

## **Minimum Viable Tools**

The balance is in features and testing. We often lose ourselves in highly defensive programming, trying to capture every possible error. In that way we create flexible code which is hard to maintain. But when do we add a feature, when is the cost of convenience high enough to invest? That is still something we're figuring out along the way.

## **A Game Is Not an Editor**

This is something we need to repeat to ourselves often: **we're making a game, not an engine (with all the tooling alongside)**.

Yes, great tools can help build great games. But **tools serve the game and not the other way around**.

It's easy to fall in love with building something elegant, powerful, and flexible. But the player will never see that. What they *will* see is the story, the atmosphere, the characters, the tension, the joy. That's what we're here to build.

## **The Takeaway**

So, to all the fellow developers out there (especially the solo devs and small teams) it's okay to say:

> "No, I don't need a tool for that right now."

Sometimes, the fastest way to build your game is to get your hands dirty and do the repetitive work. Sometimes, it's faster to copy-paste a few things than to write a parser. Sometimes, it's better to build the world than to perfect the scaffolding beneath it.

Build tools wisely. Use them to enable the game. And always keep your eyes on the bigger goal: Creating a game that's not just functional, but **memorable.**

Because in the end, the player isn't playing your editor. They're living in your world.
