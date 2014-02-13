Monkeys = new Meteor.Collection("monkeys");

if (Meteor.isClient) {
	Meteor.subscribe('monkeys');
	
	Template.monkeyForm.events({
		"click #startMonkeys": function(event, template) {
			var name = $("#name").val();
			
			if(name.length === 0) {
				return;
			}
			
			Meteor.http.get("/hamlet.txt", function (error, result) {
				var m = new Monkey(result.content, 50);
				
				var t = new Trainer(name, Monkeys.findOne({ name: name }), m );
			
				t.run();
			});
		},
	});
	
	Template.leaderboard.monkeys = function () {
		return Monkeys.find({}, {
			limit: 10,
			sort: {
				score: -1,
				date: -1
			},
		});
	};
}
