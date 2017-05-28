RandomPasswords = new Meteor.Collection("randompasswords");

Schemas = {};

Schemas.RandomPasswords = new SimpleSchema({
	current: {
		type: String
	},
	userId: {
		type: String
	}
});
RandomPasswords.attachSchema(Schemas.RandomPasswords);
