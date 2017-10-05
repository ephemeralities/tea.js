/**
 * Creates an instance of a Game
 * @class Game
 * @param {number} width - specifies the width of the game screen's viewport
 * @param {number} height - specifies the height of the game screen's viewport
 * @param {boolean} antialiasing - sets whether antialiasing is active or not
 */
 
function Game(width, height, antialiasing = false) {
    this.activeObjects = [];
    this.freeSpaces = [];
    this.camera = new Camera(0, 0);
    this.directory = "assets/";
    this.keys = new Keys();
    this.sprites = new SpriteContainer();
    this.objects = [];
    this.objectPositions = [];
    this.screen = new Screen(width, height, antialiasing);
    this.variable = {};

    Sprite.prototype.game = this;
    Camera.prototype.game = this;
    Camera.prototype.activeObjects = this.activeObjects;
    Camera.prototype.screen = this.screen;
    Screen.prototype.game = this;
    Screen.prototype.activeObjects = this.activeObjects;
    Keys.prototype.game = this;

    window.addEventListener("load", this.worldInitialize);
    window.addEventListener("keydown", this.keys.keyActive);
    window.addEventListener("keyup", this.keys.keyInactive);
    window.Key = this.keys;
    window.Variable = this.variable;
    window.Sprites = this.sprites;
}

Game.prototype = {
    
    /**
     * Adds sprite to the game
     * @memberof Game.prototype
     * @instance
     * @function add
     * @param {Sprite} sprite - Sprite to be added
     */
     
    add: function(sprite) {
        this.objects.push(sprite);
        let i = this.objects.length - 1;
        this.sprites.add(this.objects[i]);
    },

    /**
     * Adds Sprite to the active scope
     * @memberof Game 
     * @instance
     * @func addToActive
     * @param {Sprite} sprite - Sprite to be added
     */
     
    addToActive: function(sprite) {
        let space = this.freeSpaces.pop();
        sprite.active = true;

        if(space == undefined)
            this.activeObjects.push(sprite);
        else
            this.activeObjects[space] = sprite;
    },

    changeLayer: function(layers, sprite) {
        let spritePosition = this.activeObjects.indexOf(sprite);
        if(spritePosition >= 0) {
            let sprite1 = this.activeObjects[spritePosition];
            let sprite2 = this.activeObjects[spritePosition + layers];
            this.activeObjects[spritePosition] = sprite2;
            this.activeObjects[spritePosition + layers] = sprite1;
        }
    },

    /**
     * Specifies the directory in which image assets are stored
     * @memberof Game
     * @instance
     * @func changeDirectory
     * @param {String} [newDirectory = "assets/"] - New directory
     */
     
    changeDirectory: function(newDirectory) {
        this.directory = newDirectory + "/";
    },
    
    /**
     * Deletes all instances of sprite from the game
     * @memberof Game 
     * @instance
     * @func delete
     * @param {Sprite} sprite - Sprite to be deleted
     */
     
    delete: function(sprite) {
        let i = this.objects.indexOf(sprite);
        if(i.active == false)
            this.objects[i] = undefined;
        else {
            this.removeFromActive(this.activeObjects.indexOf(sprite));
            this.objects[i] = undefined;
        }
    },
    
    /**
     * Removes sprite from active scope
     * 
     * @memberof Game 
     * @instance
     * @func removeActive
     * @param {Sprite} sprite - Sprite to be removed from active scope
     */
    removeActive: function(sprite) {
        sprite.active = false;
        sprite.memory.update();

        let i = this.activeObjects.indexOf(sprite);
        this.activeObjects[i] = undefined;
        this.freeSpaces.push(i);
    },

    removeFromActive: function(index) {
        this.activeObjects[index] = undefined;
        this.freeSpaces.push(index);
    },
    
    /**
     * Updates the world
     * 
     * @memberof Game 
     * @instance
     * @func update
     */
    update: function() {
        this.camera.updateActive();
        this.screen.drawActive();
    },

    worldInitialize: function() {
        init();
        window.requestAnimationFrame(main);
        window.removeEventListener("load", this.worldInitialize);
    }
};
