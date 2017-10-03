function SpriteContainer() {
}

SpriteContainer.prototype = {
    add: function(sprite) {
        this[sprite.name] = sprite;
    },

    delete: function(sprite) {
        this[sprite.name] = undefined;
    },

    get: function(name) {
        if (name == String)
            return this[name];
    }
};
