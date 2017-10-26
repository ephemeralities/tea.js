/**
 * Mouse input, my guy
 * @class Mouse
 * @prop {number} x - Current position of mouse on x-axis
 * @prop {number} y - Current position of mouse on y-axis
 * @prop {boolean} clicked - State of left mouse button
 * @prop {boolean} paused - State of mouse (paused or active)
 */

function Mouse(){
	this.x; 
	this.y;
	this.clicked;
	this.paused = false;

	//Game.prototype.mouse = this;
}

Mouse.prototype = {
	mouseup: function(info){
		this.clicked = false;
	},

	mousedown: function(info){
		this.x = info.clientX;
		this.y = info.clientY;
		this.clicked = true;
	},

	mousemove: function(info){
		this.x = info.clientX;
		this.y = info.clientY;
	},

	start: function(){
		window.addEventListener("mousemove", this.mousemove);
		window.addEventListener("mouseup", this.mouseup);
		window.addEventListener("mousedown", this.mousedown);
	},

	stop: function(){
		window.removeEventListener("mousemove", this.mousemove);
		window.removeEventListener("mouseup", this.mouseup);
		window.removeEventListener("mousedown", this.mousedown);
	},

	touching: function(sprite){
		if(touching(sprite)){
			return true;
		}
		else
			return false;
	},

	whenClicked: function(whatTodo){

	}
}
