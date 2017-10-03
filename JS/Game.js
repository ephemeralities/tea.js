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
    add: function(sprite) {
        this.objects.push(sprite);
        let i = this.objects.length - 1;
        this.sprites.add(this.objects[i]);
    },

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

    changeDirectory: function(newDirectory) {
        this.directory = newDirectory + "/";
    },

    delete: function(sprite) {
        let i = this.objects.indexOf(sprite);
        if(i.active == false)
            this.objects[i] = undefined;
        else {
            this.removeFromActive(this.activeObjects.indexOf(sprite));
            this.objects[i] = undefined;
        }
    },

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
