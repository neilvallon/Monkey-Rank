Monkeys = new Meteor.Collection("monkeys");
Counters = new Meteor.Collection("counters");


function getNextSequence(name) {
	var ret = Counters.findOne({ _id: name });
	Counters.update({ _id: name }, { $inc: { seq: 1 } });
	return ret ? ret.seq : 1;
}


if (Meteor.isClient) {
	Meteor.subscribe('monkeys');
	
	Template.rankTable.monkeys = function () {
		return Monkeys.find({}, {
			limit: 10,
			sort: {
				score: -1,
				date: -1
			},
		});
	};
}

if (Meteor.isServer) {
	Meteor.publish('monkeys', function() {
		return Monkeys.find({}, {score:-1, limit: 50});
	});
	
	Meteor.startup(function () {
		if (Counters.find({_id: "monkey"}).count() === 0)
			Counters.insert({_id: "monkey", seq: 1});
	});
}
