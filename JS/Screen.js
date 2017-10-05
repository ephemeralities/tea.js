/**
 * Representation of screen which displays all game objects
 * 
 * @class Screen
 * @param {number} width - Sets width of the game screen
 * @param {number} height - Sets height of the game screen
 * @param {boolean} [antialiasing = false] - Sets whether antialiasing is active or not
 * 
 */

function Screen(width, height, antialiasing) {
    this.canvas = document.createElement("canvas");
    this.canvas.height = height;
    this.canvas.width = width;
    this.clearHeight = height;
    this.clearWidth = width;
    this.ctx = this.canvas.getContext("2d");
    this.height = height;
    this.width = width;

    if (typeof(antialiasing) != "boolean")
        this.ctx.imageSmoothingEnabled = true;
    else
        this.ctx.imageSmoothingEnabled = antialiasing;

    document.body.appendChild(this.canvas);
}

//https://stackoverflow.com/questions/32468969/rotating-a-sprite-in-a-canvas

Screen.prototype = {
    
    /**
     * Clears the entire screen
     * 
     * @memberof Screen
     * @instance
     * @func clear
     */
    clear: function() {
        this.ctx.clearRect(0, 0, this.clearWidth, this.clearHeight);
    },
    
    /**
     * Draws sprite at the sprite's current coordinate location in conjunction
     * with the camera's position
     * 
     * @memberof Screen
     * @instance
     * @func draw
     * @param {Sprite} sprite - Sprite to draw
     */
     
    draw: function(sprite) {
        this.ctx.drawImage(sprite.image, sprite.x - this.camera.x, sprite.y - this.camera.y);
    },

    drawAt: function(item) {
        this.ctx.drawImage(item.image, item.x, item.y);
    },
    
    /**
     * Calls a draw for each object within active scope.
     * 
     * @memberof Screen
     * @instance
     * @func drawActive
     */

    drawActive: function() {
        this.clear();
        var len = this.game.activeObjects.length;
        for (var i = 0; i < len; i++) {
            if (this.game.activeObjects[i] !== undefined)
                if(Math.abs(this.activeObjects[i].rotation) > 0){
                    let x = this.camera.abs(this.activeObjects[i],0) + this.activeObjects[i].width / 2;
                    let y = this.camera.abs(this.activeObjects[i],1) + this.activeObjects[i].height / 2;
                    this.ctx.translate(x,y);
                    this.ctx.rotate(this.activeObjects[i].rotation * Math.PI / 180);
                    this.draw(this.activeObjects[i]);
                    this.ctx.rotate(-this.activeObjects[i].rotation * Math.PI / 180);
                    this.ctx.translate(-x,-y);
                }
                else
                    this.draw(this.game.activeObjects[i]);
        }
    },
    
    /**
     * Rotates the entire game screen
     * 
     * @memberof Screen
     * @instance
     * @func rotate
     * @param {number} degrees - Desired orientation
     */
    rotate: function(degrees){
        this.ctx.rotate(degrees * Math.PI / 180);
    },
    
    /**
     * Resizes entire canvas to a new height and width
     * 
     * @memberof Screen
     * @instance
     * @func setSize
     * @param {number} width - Desired width
     * @param {number} height - Desired height
     * 
     * */
    setSize: function(width, height) {
        this.canvas.height = height;
        this.canvas.width = width;
    },
    
    /**
     * Writes text onto screen at specified coordinates.
     * Useful for debugging
     * 
     * @memberof Screen
     * @instance
     * @func write
     * @param {string} string - String to write
     * @param {number} [x = 20] - X position for text
     * @param {number} [y = 20] - Y position for text
     * 
     * */

    write: function(string, x = 20, y = 20) {
        this.ctx.fillText(string, x, y);
    }
};
