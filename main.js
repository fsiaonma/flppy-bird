var MainLayer = cc.Layer.extend({
	ctor: function() {
		this._super();

		this._bird = null;
		this._battle = null;
		this._scoreText = null;
		this._score = 0;

		this._initBg();
		this._initBird();
		this._initBattle();
		this._initScore();
		this._bindEvent();

		this.schedule(this.update);
	},

	update: function() {
		if (this._isGameOver()) {
			cc.director.pause();
			setTimeout(function() {
				cc.director.resume();
				cc.director.runScene(new MainScene());
			}, 1000);	
		}
	
		this._bird.update();
		this._battle.update();
		this._calScore();
	},

	_initBg: function() {
		var bg = cc.Sprite.create("imgs/bg.png");
		bg.setScale(cc.winSize.width / bg.width, cc.winSize.height / bg.height);
		bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
		this.addChild(bg);
	},

	_initBird: function() {
		this._bird = new Bird();
		this._bird.setPosition(cc.p(cc.winSize.width / 4, cc.winSize.height / 2));
		this.addChild(this._bird);
	},

	_initBattle: function() {
		this._battle = new Battle();
		this.addChild(this._battle);
	},

	_initScore: function() {
		this._scoreText = new cc.LabelTTF(this._score + "", "Arial", 21);
        this._scoreText.setColor(cc.color("#1f2d96"));
        this._scoreText.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(this._scoreText);
	},

	_bindEvent: function() {
		var self = this;

        if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event){
                    self._bird.jump();
                }
            }, this);

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
	            event: cc.EventListener.TOUCH_ONE_BY_ONE,
	            swallowTouches: true,
	            onTouchBegan: function() {
	                self._bird.jump();
	            }
	        }, this);
        }
	},

	_isGameOver: function() {
		var flag = false;
		if (this._bird.y < 0) {
			flag = true;
		}
		var pumps = this._battle.getChildren();
		for (var i = 0, len = pumps.length; i < len; ++i) {
			if (cc.rectIntersectsRect(this._bird.getBoundingBox(), pumps[i].getBoundingBox())) {
				flag = true;
				break ;
			}
		}
		return flag;
	},

	_calScore: function() {
		var pumps = this._battle.getChildren();
		for (var i = 0, len = pumps.length; i < len; ++i) {
			var pump = pumps[i];
			if (pump.type == "top" && pump.x < this._bird.x && !pump.isPass) {
				pump.isPass = true;
				this._scoreText.setString((++this._score) + "");
			}
		}
	}
})	

var MainScene = function() {
    var scene = new cc.Scene();
    var layer = new MainLayer();
    g_main = layer;
    scene.addChild(layer);
    return scene;
};

var g_main = null;