
Meteor.startup(function() {
	generator = require('generate-password');

	Meteor.publish('user', function() {
		if (this.userId) {
			return Meteor.users.find({_id: this.userId});
		}
  	});

});

Meteor.methods({
	logUserIn: function(credentials) {
		check(credentials, Object);
		check(credentials.username, String);
		check(credentials.password, String);

		var response;
		var user = "";
		var randomPassword;

		try {
			randomPassword = generator.generate({ length: 20, symbols: true, numbers: true });
			console.log(randomPassword);
		} catch (e) {
			throw new Error("Unable to create temporary token");
		}

		try {
			response = HTTP.call("GET",("http://localhost:8000/auth/"+ credentials.username + "/" + credentials.password)).data;
			console.log(response);
			if(response.login==="failed") {
				console.log("failed");
				return {failed: "Username/password is incorrect."};
			}
		} catch (e) {
			throw new Error("Authentication failed: Unable to get an ldap response. Check ldap connection.");
		}

		if (response.username) { // if user auths in ldap
			user = Accounts.findUserByUsername(response.username);
			if(user) { // if user exists locally
				try {
					console.log("User exists locally");
					Accounts.setPassword(user._id, randomPassword);
					console.log("logging in user");
					return { token: randomPassword };
				} catch (e) {
					throw new Error("Unable to log user in or change password.");
				}
			} else {
				console.log("does not exist locally");
				try {
					if(id = Accounts.createUser({ username: credentials.username, password: randomPassword })) {
						return {token: randomPassword};
					} else {
						throw new Error("Unable to create user locally");
					}
				} catch (e) {
					throw new Error("unable to create account after ldap validation");
				}
			}
		}

		// 	function(error, response){
		// 		if(error) {
		// 			console.log("Error");
		// 		} else {
		// 			console.log(response.data);
		// 		}
		// });

		// Accounts.createUser({
	   //    username: username,
	   //    password: password
		//  	}, function(error){
		//   console.log(error);
		//  	});
	},
	getSites: function(query) {
		check(query, String);
		var sites = Meteor.call('sites');
		return sites.filter(function(site) {
			return (site.name.toLowerCase().indexOf(query)>=0 || site.code.toLowerCase().indexOf(query)>=0);
		});
	},
	getIncidentTypes: function(query) {
		check(query, String);
		var incidentTypes = Meteor.call('incidentTypes');
		return incidentTypes.filter(function(incidentType) {
			return (incidentType.name.toLowerCase().indexOf(query)>=0);
		});
	}
});
