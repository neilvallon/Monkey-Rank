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
