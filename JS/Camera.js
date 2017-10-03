function Camera(x, y) {
    this.active = true;
    this.anchored = false;
    this.x = x;
    this.y = y;
    this.following;
    this.trackZoom = 100;
    this.zoom = 1;

    Sprite.prototype.camera = this;
    Screen.prototype.camera = this;
}

Camera.prototype = {
    abs: function(sprite, num) {
        return (num = 1) ? sprite.y - this.y : sprite.x - this.x;
    },
    
    changeZoom: function(amount) {
        this.screen.clearWidth = this.screen.width * (100 / this.trackZoom);
        this.screen.clearHeight = this.screen.height * (100 / this.trackZoom);

        this.trackZoom += amount;
        this.setZoom(this.trackZoom);
        
        this.x += amount;
        this.y += amount;
    },
    
    move: function(x, y){
        this.x = x;
        this.y = y;
    },
    
    resetZoom: function() {
        this.zoom = (1 / this.zoom);
        this.screen.ctx.scale(this.zoom, this.zoom);
        this.zoom = 1;
    },
    
    
    setAnchor: function(x, y) {
        this.anchored = true;
        this.anchor = (this.anchor != undefined) ? this.anchor.update(x, y) : new Coordinate(x, y);
    },

    setFollow: function(sprite, active) {
        if(active){
            
        }
    },

    setZoom: function(zoom) {

        if (this.zoom > 1 || zoom > 0) {
            this.resetZoom();
            this.zoom = zoom / 100;
            this.screen.ctx.scale(this.zoom, this.zoom);
        }
        this.screen.clearWidth = this.screen.width * (100 / this.zoom);
        this.screen.clearHeight = this.screen.height * (100 / this.zoom);
    },

//will add and remove objects from the World active object array
//probably won't crash if there are no active objects
    
    updateActive: function(){
        let obj = this.game.activeObjects;
        let len = obj.length;
        
        //removes object from active objects if it is outside of the camera viewport
        for(var i = 0; i < len; i++){
            if(obj[i] != undefined){
                if(obj[i].x + obj[i].width < this.x || obj[i].x > this.x + this.screen.width || obj[i].y > this.y + this.screen.height || obj[i].height < this.y){
                    let temp = obj[i];
                    if(temp.active){
                        this.game.removeActive(temp);
                    }
                }
            }
        }
        
        obj = this.game.objectPositions;
        len = obj.length;
        
        //adds object to active objects array if it is within view of camera
        
        for(var i = 0; i < len; i++){
            if((obj[i].x > this.x && obj[i].x < this.x + this.screen.width) || (obj[i].y < this.y + this.screen.height && obj[i].height > this.y)){
                if(!obj[i].objectRef.active)
                    //1 + 1;
                    this.game.addToActive(obj[i].objectRef);
            }
        }
    }
};
