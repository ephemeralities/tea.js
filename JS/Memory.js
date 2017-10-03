/*
Memories will serve as simple coordinate containers for sprites which are no longer
active. By not accessing and parsing through the objects array, overhead and resources
will not be wasted.
*/

function Memory(x,y,obj){
    this.x = x;
    this.y = y;
    this.objectRef = obj;
    
    this.coordinate = new Coordinate(x, y);
}

//update() will update with last object coordinates before being removed from active scope.

Memory.prototype = {
    update: function(){
        this.x = this.objectRef.x;
        this.y = this.objectRef.y;
        
        this.coordinate.update(this.objectRef.x, this.objectRef.y);
    }
};
