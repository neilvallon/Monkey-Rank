verifyState = function(state){
	Future = Npm.require('fibers/future');
	var fs = Npm.require('fs')
	var path = Npm.require('path')
	
	var fut = new Future();
	
	fs.readFile(path.resolve('../client/app/hamlet.txt'), 'utf8', function(err, data) {
		fut.return(data);
	});
	
	var hamlet = fut.wait();
	var monkey = new Monkey(hamlet, 50);
	
	monkey.rng.setState(state);
	
	for(var i = 0; i < hamlet.length; i++){
		var car = monkey.getChar(monkey.keyboard, monkey.rng);
		if(car === 'CAPS' || car === 'NULL'){
			i--;
		} else if(car === 'back') {
			i = i - 2;
		} else if(car.toLowerCase() !== hamlet.charAt(i).toLowerCase()) {
			break;
		}
	}
	
	return i;
};
