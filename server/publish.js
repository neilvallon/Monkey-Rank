Monkeys = new Meteor.Collection("monkeys");
Counters = new Meteor.Collection("counters");

function getNextSequence(name) {
	var ret = Counters.findOne({ _id: name });
	Counters.update({ _id: name }, { $inc: { seq: 1 } });
	return ret ? ret.seq : 1;
}

Meteor.publish('monkeys', function() {
	return Monkeys.find({}, {score:-1, limit: 50});
});

Meteor.startup(function () {
	if (Counters.find({_id: "monkey"}).count() === 0)
		Counters.insert({_id: "monkey", seq: 1});
});

Meteor.methods({
	updateMonkey: function (name, score, state) {
		var monkey = Monkeys.findOne({ name: name });
		
		if(monkey === undefined) {
			Monkeys.insert({
				name: name,
				score: score,
				state: state,
				number: getNextSequence("monkey"),
				date: new Date,
			});
		} else if(score > monkey.score) {
			monkey.score = score;
			monkey.state = state;
			monkey.date = new Date;
			Monkeys.update({ name: name }, monkey);
		}
	}
});
