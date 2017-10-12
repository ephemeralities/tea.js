# Tea.js
A basic JavaScript game engine created with elements of Scratch in mind. Kind of intended to be a simple retro game engine.
Documentation can be found at:

# Initializing the engine

To begin a project, you must always have an init() and main() function. Init initializes the engine and preloads any assets. Main is where the magic happens.

To start an instance of a game, you create a new Game object as shown below:

```javascript
var game = new Game(width, height, antialiasing); //antialiasing defaults to false
```

# Sprites

To create a sprite, you create a new Sprite object as shown below:

```javascript
var player = new Sprite(x-position, y-position, name, image_name);
//also can be done like so
new Sprite(x-position, y-position, name, image_name);
```

Accessing a sprite is very simple. If you have already assigned the sprite to a variable, you can access it using the variable. If you have chosen the second route, you can access it as shown.

```javascript
Sprites[name]

//example
new Sprite(30, 30, "Player", "player.jpg"); //in init()

Sprites["Player"].x += 10; //in main()
```
Keep in mind, if multiple sprites are created with the same name, a numbered suffix will be appended to the end of the name ("Player, Player0, Player1, Player2, ...etc). This is done to prevent an accidental overwrite of a sprite.

#Camera
A camera is automatically created when you create a Game. The camera can be accessed through your Game instance. The camera sports many capabilities. You can zoom in and out, change it's position on the x and y axis, anchor it to a specific point, and force it to follow a sprite. Many of the functions for the Camera can be found in the documentation.

```javascript
game.camera.follow(player);
//blah blah blah
game.camera.stopFollowing();

if(Key.w)
  game.camera.zoomIn(1);
if(Key.s)
  game.camera.zoomOut(1);
//Alternatively you could use game.camera.changeZoom(1) and game.camera.changeZoom(-1)
```
# Status

As of now, the engine is in a very primitive state, and will be for quite a while. I am really only doing this for fun.
