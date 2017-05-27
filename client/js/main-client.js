
Meteor.startup(function () {

});

Template.login.events({
  // 'submit #login-form': function (e) {
  //   e.preventDefault();
  //   var form = $(e.target);
  //   var username = form.find("#login-username").val();
  //   var password = form.find("#login-password").val();
  //
  //   //if (username === "admin") {
  // / 	 Meteor.loginWithPassword(username, password, function (error) {
  // / 		 if ( ! error && password === "admin") {
  //  //        // Set switch to trigger alert to change password
  //  //        Session.setPersistent("passChangePrompt", 1);
  // / 	 	}
  // /  	});
  //  //  } else {
  //  Meteor.loginWithLDAP(username, password,
  // 	{ dn: "uid=" + username + ",OU=Users,OU=SALT,OU=Sites,DC=hexcel,DC=com" },
  // 	function (error, success) {
  // 		if (error) {
  // 			console.log(error.reason);
  //       	} else {
  // 			console.log("logged in: " + username +" "+ password);
  // 		}
  // 	}
  //   );
  //
});
