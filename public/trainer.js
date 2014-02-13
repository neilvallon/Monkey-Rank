var refreshOutput = function(t){
	$("#raw").val(t.monkey);
	
	if(t.monkey.correctKeys > t.best){
		bestMonkey = t.monkey.correctKeys;
		$("#best").val(t.monkey);
		$("#best").val(bestMonkey + ' Letter(s)\n________________________\n' + t.monkey);
	}
};


var Trainer = function(name, oldMonkey, monkey){
	this.best = oldMonkey? oldMonkey.score : 0;
	
	this.monkeyName = name;
	this.monkey = monkey;
	this.keyboard = qwerty;
	this.caps = false;
	this.worker;
};

Trainer.prototype.update = function(){
	refreshOutput(this);
	
	if(this.monkey.correctKeys > this.best){
		this.best = this.monkey.correctKeys;
		
		Meteor.call('updateMonkey', this.monkeyName, this.best, this.monkey.paper[0].state, function(r) {
			console.log(r);
		});
	}
};

Trainer.prototype.run = function(){
	this.worker = setInterval(function(){
		this.monkey.pressKey();
		this.update();
	}.bind(this), 10);
};

Trainer.prototype.stop = function(){
	clearInterval(this.worker);
};
