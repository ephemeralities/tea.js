function Sprite(x, y, name) {
    this.x = (x == undefined) ? 0 : x;
    this.y = (y == undefined) ? 0 : y;
    this.width;
    this.height;
    this.bounds = [];
    this.currentCostume = 0;
    this.currentFrame;
    this.currentImage;
    this.collidingWith;
    this.name = name;
    this.rotation = 0;
    this.active = false;
    
    this.memory = new Memory(x,y,this);
    this.game.objectPositions.push(this.memory);
    
    this.screen = this.game.screen;

    this.game.add(this);
    this.game.addToActive(this);
    for (var i = 0; i < 4; i++) {
        this.bounds.push(new Coordinate(0, 0));
    }
}

Sprite.prototype = {
    addCostume: function(image) {
        this.costumes.push(this.loadImage(image));
    },


    loadImage: function(src) {
        this.image = document.createElement("img");
        this.image.src = this.game.directory + src;
    },

    move: function(x, y) {
        this.x = x;
        this.y = y;
        this.update();
    },

    moveLayer: function(layers) {
        this.game.changeLayer(layers, this);
    },

    nextCostume: function() {
        this.currentCostume = this.currentCostume < this.costumes.length ? this.currentCostume++ : 0;
        this.currentImage = this.costumes[this.currentCostume];
    },
    
    rotate: function(degrees){
        this.rotation = degrees;
    },
    
    setsize: function(size){
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.scale(size / 100, size / 100);
        //ctx.
    },

    update: function() {
        let w = this.width;
        let h = this.height;
        this.bounds[0].update(this.x, this.y);
        this.bounds[1].update(this.x, this.y + h);
        this.bounds[2].update(this.x + w, this.y);
        this.bounds[3].update(this.x + w, this.y + h);
    }
};
