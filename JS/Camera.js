/**
 * Represents the in-game camera
 * @class Camera
 * @param {number} x - Starting X coordinate
 * @param {number} y - Starting Y coordinate
 * @param {Game} game - Instance of a game
 * 
 * @prop {boolean} active - States whether the camera is active or not
 * @prop {boolean} anchored - States whether the camera is in an anchored state or not
 * @prop {number} x - position of camera on the x-axis
 * @prop {number} y - position of camera on the y-axis
 * @prop {Sprite} following - Sprite that is currently being followed 
 */

function Camera(x, y, game, manager) {
    this.active = true;
    this.anchored = false;
    this.x = x;
    this.y = y;
    this.following;
    this.game = game;
    this.manager = manager;
    this.czoom = 1;
    this.tzoom = 100;

    Display.prototype.camera = this;
}

Camera.prototype = {
    abs: function(sprite, num) {
        return (num = 1) ? sprite.y - this.y : sprite.x - this.x;
    },
    
    /**
     * Increases or decreases camera zoom
     * @memberof Camera.prototype
     * @func changeZoom
     * @param {number} amount - The amount to increase or decrease zoom by
     * */
    changeZoom: function(amount) {
        this.display.clearWidth = this.display.width * (100 / this.tzoom);
        this.display.clearHeight = this.display.height * (100 / this.tzoom);

        this.tzoom += amount;
        this.setZoom(this.tzoom);

    },

    /**
     * Anchors camera to a sprite and forces it to follow
     * 
     * @memberof Camera.prototype
     * @func follow
     * @param {Sprite} sprite - Sprite to follow
     * */
     
    follow: function(sprite){
        this.anchored = true;
        this.anchor = new Coordinate(sprite.x - 240, sprite.y - 135);
        this.following = sprite;
    },
    
    /**
     * Moves the camera to specified coordinate
     * @memberof Camera.prototype
     * @func move
     * @param {number} x - Coordinate on the x-axis
     * @param {number} y - Coordinate on the y-axis
     */
    move: function(x, y){
        this.x = x;
        this.y = y;
    },

    reset: function(){
        this.x = 0;
        this.y = 0;
        this.stopFollow();
        this.resetTracking();
        console.log("Camera has been reset...");
    },

    resetTracking: function(){
        this.resetZoom();
        this.tzoom = 100;
    },
    
    /**
     * Resets zoom to the initial value of 1 (100%)
     * @memberof Camera.prototype
     * @func resetZoom
     * */
    resetZoom: function() {
        this.czoom = (1 / this.czoom);
        let w = this.display.width / 2;
        let h = this.display.height / 2;
        this.display.ctx.translate(w, h);
        this.display.ctx.scale(this.czoom, this.czoom);
        this.display.ctx.translate(-w, -h);
        this.czoom = 1;
    },
    
    /**
     * Stops any following and removes anchors
     * 
     * @memberof Camera.prototype
     * @func stopFollow
     * */
    stopFollow : function(){
        this.following = undefined;
        this.anchored = false;
        this.anchor = undefined;
    },
    
    /**
     * Anchors in-game camera to specified coordinates
     * 
     * @memberof Camera.prototype
     * @func setAnchor
     * @param {number} x - X coordinate to anchor to
     * @param {number} y - Y coordindate to anchor to
     */
     
    setAnchor: function(x, y) {
        if(this.following != undefined){
            console.error("Currently following something already. Camera cannot be anchored.",
                " Please unanchor and try again.");
        }else{
            if(x > 0 && y > 0){
                this.anchored = true;
                if(this.anchor == undefined)
                    this.anchor = new Coordinate(x, y);
                else
                    this.anchor.update(x, y);
            }
        }
    },
    
    /**
     * Sets the camera zoom to the specified value 
     * @memberof Camera.prototype
     * @func setZoom
     * @param {number} zoom - Sets zoom amount
     */
     
    setZoom: function(zoom) {

        if (this.czoom > 1 || this.czoom > 0) {
            this.resetZoom();
            this.czoom = this.czoom / 100;
            let w = this.display.width / 2;
            let h = this.display.height / 2;
            this.display.ctx.translate(w,h);
            this.display.ctx.scale(this.czoom, this.czoom);
            this.display.ctx.translate(-w,-h);
        }
        this.display.clearWidth = this.display.width * (100 / this.czoom);
        this.display.clearHeight = this.display.height * (100 / this.czoom);
    },

    update: function(){
        if(this.anchored == false && this.following == undefined){
            this.x = this.x < 0 ? 0 : this.x;
            this.y = this.y < 0 ? 0 : this.y;
        }else if(this.anchored){
            this.x = this.anchor.x > 0 ? this.anchor.x : 0;
            this.y = this.anchor.y > 0 ? this.anchor.y : 0;
        }else if(this.following != undefined){
            this.follow(this.following);
        }
    },

    zoom: function(zoom){
        let w = this.display.width / 2;
        let h = this.display.height / 2;
        this.display.ctx.translate(w,h);
        this.display.ctx.scale(zoom, zoom);
        this.display.ctx.translate(-w,-h);
    },

    zoomIn: function(amount){

    },

    zoomOut: function(amount){

    },
    
    /**
     * Updates active scope
     * @memberof Camera.prototype
     * @func updateActive
     */
    updateActive: function(){
    }
};
