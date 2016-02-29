var Battle = cc.Layer.extend({
	ctor: function() {
		this._super();
		this._step = 0;
	},

	_generatePumps: function() {
		var time = 3;

		var top = cc.Sprite.create("imgs/pipeDown.png");
		top.type = "top";
		top.setPosition(cc.p(cc.winSize.width + 50, 440 + Math.floor(Math.random() * 150)));
		this.addChild(top);
		top.runAction(cc.moveTo(time, cc.p(-50, top.y)), cc.callFunc(function() {
			top.removeFromParent(true);
		}, this));

		var bottom = cc.Sprite.create("imgs/pipeUp.png");
		bottom.type = "bottom";
		bottom.setPosition(cc.p(cc.winSize.width + 50, top.y - 160 - 150 - 160));
		this.addChild(bottom);
		bottom.runAction(cc.moveTo(time, cc.p(-50, bottom.y)), cc.callFunc(function() {
			bottom.removeFromParent(true);
		}, this))
	},

	update: function() {
		this._step++;
		if (this._step % 60 == 0) {
			this._generatePumps();
		}
	}
});