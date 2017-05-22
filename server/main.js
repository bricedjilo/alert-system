
Meteor.startup(function() {
	LDAP_DEFAULTS.url = 'ldap://LONDNT201.Hexcel.com/OU=Users,OU=SALT,OU=Sites,DC=hexcel,DC=com';
	LDAP_DEFAULTS.dn = 'OU=Users,OU=SALT,OU=Sites,DC=hexcel,DC=com';
	LDAP_DEFAULTS.port = '';
	LDAP_DEFAULTS.searchResultsProfileMap = [
		{
	      resultKey: 'cn',
	      profileProperty: 'name'
	    }
	    ,{
	      resultKey: 'mail',
	      profileProperty: 'phoneNumber'
	    }
	 ]
});
