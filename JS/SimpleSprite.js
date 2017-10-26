/**
 * A simple representation of a Sprite. It is the foundation
 * of the standard Sprite. Simple sprites do not have any collision
 * and lack many of the features exclusive to Sprites.
 *
 * @constructor SimpleSprite
 * @param {number} x - Starting position on the x-axis
 * @param {number} y - Starting position on the y-axis
 * @param {string} name - Name to be used as an ID for the sprite
 * @param {string} img - Image to be used (ex. sprite.png)
 *
 * @prop {number} rotation - Current rotation of sprite in degrees
 * @prop {number} size - Current size of the sprite
 * @prop {number} x - Current position of sprite on x-axis
 * @prop {number} y - Current position of sprite on y-axis
 * @prop {string} name - ID assigned by user
 */

function SimpleSprite(x, y, name, img){
	this.rotation = 0;
	this.size = 1;

	this.x = x;
	this.y = y;
	this.name = name

	this.image;
	this.scaledImage;

	this.manager.add(this);
}

SimpleSprite.prototype = {

	clone: function(){
		let clone = new SimpleSprite(this.x, this.y, this.name + "clone", this.image);
		return clone;
	},
	/**
	 * Makes the sprite grow in size
	 * @memberof SimpleSprite.prototype
	 * @func grow
	 * @param {number} amount - Amount to grow in size by
	 */
	grow: function(amount){
		this.size += amount / 100;
	},

	loadImage: function(image) {
        this.image = document.createElement("img");
        this.image.src = this.game.directory + image;
    },

	sizeReset: function(){
		this.size = 1;
	},

	/**
	 * Rotates the sprite by specified degree
	 * @memberof SimpleSprite.prototype
	 * @func rotate
	 * @param {number} degrees - 
	 */
	rotate: function(degrees){
		this.rotation += degrees;
		if(this.rotation > 360)
			this.rotation %= 360;
	},

	/**
	 * Rotates the sprite by specified degree
	 * @memberof SimpleSprite.prototype
	 * @func rotate
	 * @param {number} degrees - 
	 */
	setRotation: function(angle){
		this.rotation = angle;
	},

	/**
	 * Rotates the sprite by specified degree
	 * @memberof SimpleSprite.prototype
	 * @func rotate
	 * @param {number} degrees - 
	 */
	shrink: function(amount){
		this.size -= amount / 100;
	}
}
