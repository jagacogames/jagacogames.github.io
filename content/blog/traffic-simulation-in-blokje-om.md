---
title: "Traffic simulation in Blokje Om"
date: "2017-01-17"
author: "Vincent Broeren"
excerpt: "Virtual traffic training game aimed at younger audience requires realistic traffic simulation. The game uses a traffic manager system to control vehicles, bicycles, and pedestrians throughout the city environment."
tags: ["Blink VR", "tech", "game-design"]
featuredImage: "/blog/_featured/traffic-simulation-in-blokje-om.png"
---

# Traffic simulation in Blokje Om

"Blokje Om" is a virtual traffic training game aimed at a younger audience. With "Blokje Om" children can train themselves to safely participate in traffic while in a wheelchair or mobility scooter. This means traffic should be realistic enough for youngsters to train in a fun and cartoony world, but with realistic traffic. How did we achieve this? This blog post will answer that question by giving insight in some of the sub-systems of the traffic simulator.

## Traffic manager

We use something called a Traffic manager to keep an overview of all traffic in the whole city. It is responsible for spawning a certain amount of cars, as well as direct where they get to go in the city. This allows us a large amount of control over otherwise independently operating vehicles, bicycles and pedestrians. One of the things we change depending on the mission the player is on, is increase or decrease the amount of traffic in the world. This makes it a lot harder to cross the road without looking, thus forcing players to play by the rules.

As mentioned before, the traffic manager directs where traffic goes in the world. This includes telling cars to stay on the road and pedestrians to stay on the sidewalk. The traffic manager knows what is road or curb through the means of waypoints, more on that later. The pedestrians walk on all sidewalks and squares where the player also needs to drive around in his mobility scooter. This makes it harder for the player to navigate through the world because he is not allowed to hit the pedestrians (just like in real life). Once in a while the pedestrians also cross the roads on pedestrian crossings where they nicely wait for a green light so they don't get hit by the passing cars.

## Waypoints

A waypoint is a point in the world that is marked as a destination for computer controlled cars and people. Those move from waypoint to waypoint to get to the places they need to. The waypoints in our city are attached to individual road pieces. At the edges of road pieces are 'connection points' which are used by the traffic manager to connect the separate road sections to each other.

In the picture below you can see three different colors of waypoints. Red waypoints are for cars, the blue for pedestrians and the green for bicycles. Each waypoint contains information about where it is in the world, whether or not it is in a curve, the maximum speed and information on nearby traffic lights.

## Traffic lights

One of the important parts of safely navigating through traffic is knowing and obeying the rules. Traffic lights are (besides road signs) a major part of that and because of that "Blokje Om" has a big focus on them. Every crossing and t-junction with traffic lights has its own traffic light manager. This manager makes sure the lights operate together and manages the flow of traffic over the intersection.

For the training part of the simulation it is important that "the traffic lights function in the same way as in real life (in the Netherlands)." For example a green traffic light for cars always turns orange before it turns red. When all lights are red there is a small time delay for the intersection to clear its traffic before the next light turns green. The traffic light manager even takes into account which light has the most cars waiting for it, giving it priority over other lights and preventing gridlocks in the city. When a pedestrian want to cross the road it should wait for its own light to turn green. The game always give priority to the pedestrians preventing the player from waiting to long for a red light (where is the fun in waiting?). All traffic lights on an intersection are paired together, so in theory we can add multiple lanes and multiple types of intersections and the management of all the lights will scale with it.

## Emergency vehicles

A difficult exception to the 'normal' rules in traffic are the emergency vehicles. When the lights are all off they are just normal cars, but when the lights and sounds are turned on they get priority over everything. The priority part of the emergency vehicles are not switched on in the game yet, but they do drive around in the city because they are awesome to look at. We will introduce them into the game via special scenarios in the future, and eventually the traffic will be flexible enough to allow them to dynamically switch to priority rides during the game.

## Conclusion

This blog post hopes to provide some insight in the issues you have to deal with when you're making a traffic simulation game. We have only focused on the traffic and the management of it. By keeping it flexible and extendable we will be able to add new scenarios and roads in the future. It provides us with a stable base for now.

If you have any questions about the game or want see a demo or want to know more in-depth information about one of the subjects please let us know, we love to talk some more about it.
