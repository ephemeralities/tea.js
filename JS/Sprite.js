/**
 * Creates a Sprite with at the specified x and y coordinate
 * @constructor Sprite
 * @param {number} x - Starting X position for Sprite.
 * @param {number} y - Starting Y position for Sprite.
 * @param {string} name - Name used for accessing Sprite.
 * 
 * @prop {number} x - Current position on the x axis
 * @prop {number} y - Current position on the y axis
 * @prop {array} bounds - Array of four coordinates used for bounding box
 * @prop {string} name - Name of the sprite
 */ 

function Sprite(x = 0, y = 0, name = "joe", image) {
    this.x = x < 0 ? 0 : x;
    this.y = y < 0 ? 0 : y;

    this.width;
    this.height;

    this.bounds = [];
    this.currentCostume = 0;
    this.currentFrame;
    this.currentImage;
    this.collidingWith;
    this.name = name;
    this.image;
    this.srcImg;

    this.rotation = 0;
    this.active = false;
    
    this.memory = new Memory(x,y,this);
    this.manager.objectMemories.push(this.memory);
    
    this.display = this.game.display;

    this.manager.add(this);

    if(image != undefined)
        this.loadImage(image);
    else
        console.error("Image source for: " + this.name + " not specified");

    for (var i = 0; i < 4; i++) {
        this.bounds.push(new Coordinate(0, 0));
    }
}

Sprite.prototype = {
    addCostume: function(image) {
        this.costumes.push(this.loadImage(image));
    },

    clone: function(){
        let clone = new Sprite(this.x, this.y, this.name + "clone", this.image);
    },

    ghost: function(amount){
        this.effects.transparent(this, amount);
    },

    grow: function(amount){
        this.size += amount;
    },

    loadImage: function(src) {
        
        this.srcImg = document.createElement("img");
        this.srcImg.src = this.game.directory + src;

        this.image = document.createElement("img");
        this.image.src = this.game.directory + src;
        
        
        //this.currentImage = new Image();
        //this.currentImage.src = this
        /*
        if(typeof(src) == "string"){
            this.image = document.createElement("img");
            this.image.src = this.game.directory + src;

            this.currentImage = this.image;
        }else{
            this.image = src;
        }
        */
    },
    
    /**
     * Moves the Sprite to the specified coordinates.
     * @memberof Sprite.prototype
     * @func move
     * @param {number} x - X position to move to.
     * @param {number} y - Y position to move to.
     */
    move: function(x, y) {
        this.x = x;
        this.y = y;
        this.update();
    },

    nextCostume: function() {
        this.currentCostume = this.currentCostume < this.costumes.length ? this.currentCostume++ : 0;
        this.currentImage = this.costumes[this.currentCostume];
    },
    
    /**
     * @memberof Sprite.prototype
     * @func rotate
     * @param {number} degrees - Sets the Sprites rotation to the specified angle.
     */
    rotate: function(degrees){
        this.rotation = degrees;
        this.effects.rotate(this, degrees);
    },

    sizereset: function(){
        this.size = 100;
    },

    /**
     * Size to set sprite to
     * @memberof Sprite.prototype
     * @func sizeset
     * @param {number} size - Percentage to set sprite size to.
     */
    sizeset: function(size){
        this.size = size;
    },

    /**
     * Shrinks the sprite
     * @memberof Sprite.prototype
     * @func sizeset
     * @param {number} amount - Amount to shrink sprite by.
     */
    shrink: function(amount){
        this.size -= amount;
    },

    update: function() {
        let x = this.x;
        let y = this.y;
        let w = this.width;
        let h = this.height;
        this.bounds[0].update(x, y);
        this.bounds[1].update(x, y + h);
        this.bounds[2].update(x + w, y);
        this.bounds[3].update(x + w, y + h);
    }
};
