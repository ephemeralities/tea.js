/**
 * Container for Sprites
 * @class SpriteContainer
 * */
 
function SpriteContainer() {

}

SpriteContainer.prototype = {
    
    /**
     * Adds sprite to the global Sprite container object
     * @memberof SpriteContainer.prototype
     * @func add
     * @param {Sprite} sprite - Sprite to be added
     * */
     
    add: function(sprite) {
        if(this[sprite.name] == undefined)
            this[sprite.name] = sprite;
        else{
            let i = 0
            while(true){
                if(this[sprite.name + i] == undefined){
                    this[sprite.name + i] = sprite;
                    break;
                }
                else
                    i++
            }
        }
    },
    
    /**
     * Removes the sprite from the global Sprite container
     * @memberof SpriteContainer.prototype
     * @func delete
     * @param {Sprite} sprite - Sprite to be removed
     * */
     
    delete: function(sprite) {
        this[sprite.name] = undefined;
    },
    
    /**
     * Returns the sprite with the specified name, if it exists
     * @memberof SpriteContainer.prototype
     * @func get
     * @param {string} name - Name of the sprite you wish to retrieve (must have been created beforehand)
     * @returns {Sprite}
     * @throws {ReferenceError} Thrown if sprite with given name does not exist
     * */

    get: function(name) {
        if (name == String)
            return this[name];
        else
            throw new UserException('DoesNotExist');
    }
};
