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
    clear: function() {
        this.ctx.clearRect(0, 0, this.clearWidth, this.clearHeight);
    },

    draw: function(object) {
        this.ctx.drawImage(object.image, object.x - this.camera.x, object.y - this.camera.y);
    },

    drawAt: function(item) {
        this.ctx.drawImage(item.image, item.x, item.y);
    },

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
    
    rotate: function(degrees){
        this.ctx.rotate(degrees * Math.PI / 180);
    },

    setSize: function(width, height) {
        this.canvas.height = height;
        this.canvas.width = width;
    },

    write: function(string, x = 20, y = 20) {
        this.ctx.fillText(string, x, y);
    }
};
