/*----------------- Route Configs ------------------*/
Router.configure({
    layoutTemplate: "ApplicationLayout"
} );

Router.route('/login', function() {
    this.render("login");
});

Router.route('/', function() {
    this.render("login");
});

Router.route('/dashboard', function() {
    this.render("dashboard");
});

Router.onBeforeAction(function () {
	if (!Meteor.userId()) {
		this.render('login');
  	} else {
	  	this.next();
  	}
});

/*----------------- css -------------------------------*/
Template.login.onRendered(function() {
  	$('body').addClass("hexcel");
});


/*----------------- Accounts -------------------------- */
Accounts.onLogin(function() {
	$('body').removeClass("hexcel");
	Router.go('/dashboard');
});

Accounts.onLogout(function() {
	$('body').addClass("hexcel");
	Router.go('/login');
});
