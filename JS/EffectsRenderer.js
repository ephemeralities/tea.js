function EffectsRenderer(game, debug){
	this.game = game;
	this.ctx = document.createElement("canvas").getContext("2d");

	this.ctx.canvas.height = 150;
	this.height = this.ctx.canvas.height;
	this.ctx.canvas.width = 150;
	this.width = this.ctx.canvas.width;
	this.ctx.imageSmoothingEnabled = false;
	
	this.image;

	if(debug == true || debug == 1)
		document.body.appendChild(this.ctx.canvas);
}

EffectsRenderer.prototype = {
	copy: function(sprite){
		this.ctx.drawImage(sprite.srcImg, 0, 0);
		sprite.image = this.ctx.canvas;
	},

	getImage: function(sprite){
		return sprite.image;
	},

	transparent: function(sprite, amount){
		amount = amount > 100 ? 100 : amount;
		this.ctx.clearRect(0,0,	this.height, this.width);
		this.ctx.globalAlpha = ((100 - amount) / 100).toFixed(1);
		this.ctx.drawImage(sprite.srcImg, 0, 0);
		this.ctx.globalAlpha = 1;
		sprite.image = this.ctx.canvas;
	},

	rotate: function(sprite, angle){
		this.ctx.clearRect(0,0,150,150);
		this.ctx.save();

		angle = angle < 0 ? 360 + angle : angle;
		let w = sprite.srcImg.width / 2;
		let h = sprite.srcImg.height / 2;

		this.ctx.translate(w, h);
		this.ctx.rotate(angle * Math.PI / 180);
		this.ctx.drawImage(sprite.srcImg, -w, -h);
		this.ctx.restore();
		sprite.image = this.ctx.canvas;
	},

	scale: function(image, amount){
		if(amount > 0){
			this.ctx.clearRect(0,0,150,150);
			this.ctx.save();

			let w = image.width / 2;
			let h = image.height / 2;

			this.ctx.translate(w, h);
			this.ctx.scale(amount / 100, amount / 100);
			this.ctx.drawImage(image, -w, -h);
			this.ctx.restore();
			return this.ctx.canvas;
		}
	}
}
