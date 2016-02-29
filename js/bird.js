var Bird = cc.Sprite.extend({
	ctor: function() {
		this._super("imgs/bird.png");
		this._velocity = 0;
		this._acceleration = -0.7;
	},

	jump: function() {
		this._velocity = 11;
	},

	isDead: function() {
		return this.y <= 0 || this.getBoundingBox() 
	},

	update: function() {
		this._velocity += this._acceleration;
		this.y += this._velocity;
	}
})