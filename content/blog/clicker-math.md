---
title: "Clicker Math"
date: "2017-01-31"
author: "Thom Zeilstra"
excerpt: "Overview of the mathematical systems behind Clickernauts, a clicker game featuring weapon upgrades and exponential resource growth mechanics."
tags: ["tech", "game-design", "math"]
featuredImage: "/blog/_featured/clicker-math.png"
---

One of the many smaller projects we have is Clickernauts. Clickernauts is, as the name suggests, a clicker game. The objective is to collect as much scrap as you possibly can. To speed this up the player is able to buy weapons. These weapons destroy space ships, planets and even entire galaxies for their scrap.

## Investing

There are a total of 10 different weapons to buy. Cheaper weapons yield less scrap, so to get more scrap the player needs to buy more of the same weapon and save up for more expensive weapons, which will obtain even more scrap. The amount of scrap you get from buying the same weapon scales linearly.

**Scrap = Count × Yield**

*Count* is the amount of weapons we own of a specific type, and *yield* the amount of scrap a single weapon creates. For example: the laser artillery generates 1 scrap, if we have 3 laser artilleries we get 3 scrap each time. The price of a weapon is determined by the following function (which is used by a lot of clicker games).

**Price = BaseCost × Multiplier ^ Count**

The *Multiplier* in Clickernauts is about 1.13, in most clicker games the value ranges from 1.07 to 1.15 The higher the number, the faster the price will rise. Some games give different values to each of the different automated resource collectors. Here is an example some of the prices for the laser artillery in Clickernauts, the player will always start with a single laser artillery. This is because the player isn't able to create scrap on their own.

## What to buy?

Eventually the cost of the laser artillery is so high it is practically useless to invest in. But with the amount of scrap you get from the laser artilleries the player will now be able to wait a little bit and buy the nuclear torpedoes. This goes on and on for all the other weapons too. The fun comes from the ever increasing amount of scrap you get while investing into newer, better and cooler weapons.

Since we know the amount of scrap we get per second, how much a weapon costs and how much that weapon yields we can calculate what weapon is the best to buy next. We apply the following function to each of the different weapons to determine which one is the best to buy next.

**Rating = (Price / ScrapPerSecond) + (Price / (ScrapPerSecond + YieldPerSecond))**

## Big Numbers

Because we are working with exponential numbers, eventually the amounts of scrap we reach becomes extremely big. So big even, that a normal 32bit integer won't cut it (that will only go up to a max of 4,294,967,295 unsigned). Since the game can be played until infinity (in theory, in practice this will be a lot harder) there shouldn't be any limit on the amount of scrap you can get. So the amount of scrap, prices of weapons and yield of weapons are stored in a Big Integer. The big integer scales accordingly to the amount of memory needed. So it's perfect for use in our game!

While the currently used prices, curves, etc. will probably all change, a good foundation is laid for Clickernauts so that we can build upon it in the future. Clickernauts (and all clicker games really) are all about "the ever increasing amount of *things*, in our case scrap, you get." Some great articles have been written about on this topic.
