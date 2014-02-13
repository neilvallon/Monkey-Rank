var qwerty = [
	{
		'probability': 1.75 / 66.25,
		'keyset': 'CAPS'
	},
	{
		'probability': 2 / 66.25,
		'keyset': 'BACK'
	},
	{
		'probability': 2.25 / 66.25,
		'keyset': '\n'
	},
	{
		'probability': (1.5 * 2) / 66.25,
		'keyset': ['\t', '\\']
	},
	{
		'probability': (2.25 + 2.75) / 66.25,
		'keyset': 
			[{
				'probability': 1.5 / 66.25,
				'keyset': '|'
			},
			{
				'probability': 18.75 / 66.25, // non character key pressed
				'keyset': 'NULL'
			},
			{
				'probability': 46 / 66.25,
				'keyset': ['~','!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{','}','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?']
			}]
	},
	{
		'probability': 6.25 / 66.25,
		'keyset': ' '
	},
	{
		'probability': 46 / 66.25,
		'keyset': ['`','1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';',"'",'z','x','c','v','b','n','m',',','.','/']
	}
];

var Monkey = function(goal, errTolerance){
	this.goal = goal;
	this.goalLen = goal.length;
	this.errTolerance = errTolerance;
	
	this.paper = [];
	this.correctKeys = 0;
	
	//
	this.keyboard = qwerty;
	this.caps = false;
	this.rng = Math;
};

Monkey.prototype.correctChars = function(){
	for(var i=0; i<this.goal.length; i++)
		if(this.paper[i] != this.goal[i])
			break;
	return i;
};

Monkey.prototype.foundString = function(){
	return this.goalLen == this.correctKeys;
};

Monkey.prototype.getChar = function(keyboard, rng){
	if(typeof keyboard === "string")
		return keyboard;
	
	var target = rng.random()
	if(typeof keyboard[0] === "string")
		return keyboard[Math.floor(target*keyboard.length)];
	
	var x = 0;
	for(var i=0; i<keyboard.length; i++){
		x += keyboard[i].probability;
		if(x >= target)
			return this.getChar(keyboard[i].keyset, rng);
	}
	
	return 'NULL';
};

Monkey.prototype.typeChar = function(key){
	this.paper.push(key);
	
	if(this.paper[this.correctKeys] == this.goal[this.correctKeys])
		this.correctKeys++;
	
	if((this.paper.length - this.correctKeys) > this.errTolerance){
		this.paper.shift();
		this.correctKeys = this.correctChars();
	}
};

Monkey.prototype.pressKey = function(){
	var rndChar = this.getChar(this.keyboard, this.rng);
	rndChar = this.caps? rndChar.toUpperCase() : rndChar;
	
	switch(rndChar){
		case 'BACK':
			this.backspace();
			break;
		case 'CAPS':
			this.caps ^= true;
			break;
		case 'NULL':
			break;
		default:
			this.typeChar(rndChar);
			break;
	}
};

Monkey.prototype.backspace = function(){
	if(this.correctKeys && this.paper.length <= this.correctKeys)
		this.correctKeys--;
	return this.paper.pop();
};

Monkey.prototype.toString = function(){
	return this.paper.join('');
};




// var rnd = uheprng();
// var rnd2 = uheprng();
// rnd.initState();
// rnd2.initState();
// //rnd.addEntropy();
// console.log(rnd.string(256));
// console.log(rnd2.string(256));
