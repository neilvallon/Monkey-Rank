Monkeys = new Meteor.Collection("monkeys");
Counters = new Meteor.Collection("counters");

Meteor.publish('monkeys', function() {
	return Monkeys.find({}, {score:-1, limit: 50});
});

Meteor.startup(function () {
	if (Counters.find({_id: "monkey"}).count() === 0)
		Counters.insert({_id: "monkey", seq: 1});
});
