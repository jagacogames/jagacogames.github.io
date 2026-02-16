---
title: "Rooms in our Editor"
date: "2016-08-01"
author: "Vincent Broeren"
excerpt: "To make the life of our artists easier we decided to upgrade the level editor with the ability to create rooms in a single mouse-drag"
tags: ["tools", "editor", "development"]
featuredImage: "/blog/_featured/rooms-in-our-editor.png"
---

Our applied game ([Alpha](http://jagaco.com/Projects/#)) started as a single game with a single training purpose, but all our customers are so enthusiastic about what else our game can be used for that we decided to upgrade it to a training platform. You can imagine the extra work that decision will generate.

### Editor upgrade

To make the life of our artists easier we decided to upgrade the level editor with the ability to create rooms in a single mouse-drag. Before, whenever an artist wanted to make a new room, they had to place dozens of different wall segments into the desired shape. Because of the large amount of rooms needed for each individual level, it made a lot of sense to invest time in an extension of the level editor which would automate this for the artists. Our inspiration was "The Sims 1", to be specific, it was the way you can build rooms in that game (I never played the game before so I had to do some "research" in the weekend).

![Room footprint](https://i0.wp.com/jagaco.com/wp-content/uploads/posts/featured/RoomEmpty.png?resize=296%2C182) ![Room with walls](https://i0.wp.com/jagaco.com/wp-content/uploads/posts/featured/RoomWalls.png?resize=296%2C182)

### Implementation

Our final implementation is a little different. You can drag a shape in the editor (see left screenshot) and keep adding (or subtracting) tiles to it to create the shape of the room. When the shape is finished you can finalize the room, and the editor will add floor tiles inside the room and build walls around the room. The floor and walls are of course customizable.

### Round up

The end result is promising and makes creating new levels a whole lot easier. This is only the first version of the room 'editor' and I am sure that using it more often will create new requirements. But that is ok, or else there wouldn't be anything to program in the future…
