/**
 * Timer used for controlling events in-game.
 * @class Timer
 * @param {Game} game - Reference to the current game
 */

function Timer(game){
	this.game = game;
	this.frame = 59;
	this.seconds = 0;
  
	window.wait = this.wait;
	window.wait = window.wait.bind(this);
}

Timer.prototype = {
	reset: function(){
		this.frame = 1;
		this.seconds = 0;
	},

	update : function(){
		this.frame++;
		if(this.frame > 59){
			this.frame = 0;
			this.seconds++;
		}
	},

	/**
	 *
	 * @memberof Timer.prototype
	 * @func wait
	 * @param {number} time - Amount of time to wait before doing specified function.
	 * @param {function} func - Function to run after time specified has elapsed.
	 */
	wait : function(time, func){
		if((this.frame + (this.seconds * 60)) % (time.toFixed(1) * 60) == 0){
			if(func == undefined)
				return true;
			else{
				func()
				return;
			}
		}else{
			return false;
		}
	}
}
