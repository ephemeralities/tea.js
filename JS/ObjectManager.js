/**
 * Manages objects and culling of objects in the scene
 * @class ObjectManager
 * @param {Game} game - instance of a running game
 **/

function ObjectManager(game){
	this.game = game;
	this.objects = [];
	this.objectMemories = [];
	this.active = [];
	this.unusedspaces = [];
	this.sprites = game.sprites;

	this.game.object = this.objects;
}

ObjectManager.prototype = {
	activate: function(sprite){
		if(sprite.active == false)
			sprite.active = true;
		
		let space = this.unusedspaces.pop();
		if(space == undefined)
			this.active.push(sprite);
		else
			this.active[space] = sprite;
	},

	add: function(sprite){
		this.objects.push(sprite);
		this.activate(sprite);
	},

	deactivate: function(sprite){
		sprite.active = false;
		sprite.memory.update();
		let index = this.activeObjects.indexOf(sprite);
		this.activeObjects[index] = undefined;
		this.unusedspaces.push(index);
	},

	delete: function(sprite){

	},

	purge: function(){
		console.log(this.objects.length + " objects have been purged.");
		this.objects = [];
		this.objectMemories = [];
		this.active = [];
		this.unusedspaces = [];
	},

	remove: function(sprite){

	},

	updateactive: function(){

	}
}
