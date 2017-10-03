# Tea.js
A basic JavaScript game engine created with elements of Scratch in mind. Kind of intended to be a simple retro game engine.


# Initializing the engine

To begin a project, you must always have an init() and main() function. Init initializes the engine and preloads any assets. Main is where the magic happens.

To start an instance of a game, you create a new Game object as shown below:

```
var game = new Game(width, height, antialiasing); //antialiasing defaults to false
```
