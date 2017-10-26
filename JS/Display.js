/**
 * Creates a Display which is basically a display for all game objects.
 * 
 * @class Display
 * @param {number} width - Sets width of game display
 * @param {number} height - Sets height of game display
 * @param {boolean} [antialiasing = false] - Sets whether antialiasing is active or not
 * @param {game} game - Current game instance
 * */

function Display(width, height, antialiasing, game) {
    this.game = game;
    this.manager = game.manager;
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

Display.prototype = {
    
    /**
     * Clears the entire display
     * @memberof Display.prototype
     * @func clear
     */
    clear: function() {
        this.ctx.clearRect(0, 0, this.clearWidth, this.clearHeight);
    },
    
    /**
     * Draws sprite at the sprite's current coordinate location in conjunction
     * with the camera's position
     * 
     * @memberof Display.prototype
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
     * @memberof Display.prototype
     * @func drawActive
     */

    drawActive: function() {
        this.clear();
        var len = this.manager.active.length;
        for (var i = 0; i < len; i++) {
            if (this.manager.active[i] !== undefined)
                this.draw(this.manager.active[i]);
        }
    },
    
    /**
     * Rotates the entire game Display. Most likely impacts
     * canvas performance, so use sparingly.
     * 
     * @memberof Display.prototype
     * @func rotate
     * @param {number} degrees - Desired orientation
     */
    rotate: function(degrees){
        this.ctx.rotate(degrees * Math.PI / 180);
    },
    
    /**
     * Resizes entire canvas to a new height and width
     * 
     * @memberof Display.prototype
     * @func resize
     * @param {number} width - Desired width
     * @param {number} height - Desired height
     * 
     * */
    resize: function(width, height) {
        this.canvas.height = height;
        this.canvas.width = width;
    },

    /**
     * Updates display (draws active sprites on screen)
     *
     * @memberof Display.prototype
     * @func update
     */
    update: function(){
        this.clear();
        var len = this.manager.active.length;
        for (var i = 0; i < len; i++) {
            if (this.manager.active[i] !== undefined)
                this.draw(this.manager.active[i]);
        }
    },
    
    /**
     * Writes text onto display at specified coordinates.
     * Useful for debugging
     * 
     * @memberof Display.prototype
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
