Monkeys = new Meteor.Collection("monkeys");

Meteor.subscribe('monkeys');

Template.monkeyForm.events({
	"click #startMonkeys": function(event, template) {
		var name = $("#name").val();
		
		if(name.length === 0) {
			$('#nameGroup').addClass("has-error");
			return;
		} else {
			$('#nameGroup').removeClass("has-error");
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

Template.leaderboard.rendered = function() {
	$('.monkeyName').each(function(index) {
		var tmp = $(this).text();
		
		if(tmp.match(/^@([a-zA-Z0-9_]{1,15})$/)) {
			$(this).html(
				$('<a>', {
					text: tmp,
					href: 'https://twitter.com/'+tmp,
				})
			);
		}
		
	});
};
