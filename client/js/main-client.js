
Meteor.startup(function () {
	Meteor.subscribe('user');
});

///////////////
/// helpers
//////////////

Template.login.helpers({

});


/////////////
/// events
/////////////

Template.login.events({
	'submit #login-js-form': function(event) {
		event.preventDefault();
		// event.stopImmediatePropagation();
		var username = event.target.username.value;
		var password = event.target.password.value;
		check(username, String);
		check(password, String);
		Meteor.call('logUserIn', {
			username: username,
         password: password
     	}, function(error, result) {
			if(error) {
				console.log(error);
			} else {
				console.log(result);
				Meteor.loginWithPassword(username, result.token, function(error) {
					console.log(error);
				});
			}
		});
	  return;
	}
});

Template.dashboard.events({
	'click .logout': function() {
		event.preventDefault();
        Meteor.logout();
	}
});
