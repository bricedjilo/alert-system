// iCheck = Npm.require('iCheck');

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
Template.dashboard.onRendered(function() {
  	$('body').addClass("nav-md");
});


/*----------------- Accounts -------------------------- */
Accounts.onLogin(function() {
	$('body').removeClass("hexcel");
	Router.go('/dashboard');
});

Accounts.onLogout(function() {
	$('body').addClass("hexcel");
	$('body').removeClass("nav-md");
	Router.go('/login');
});

/*------------------ iCheck ---------------------------- */
// $('input.flat').iCheck();
Template.dashboard.onRendered(function() {
	$('input.flat').iCheck({
		 checkboxClass: 'icheckbox_flat-blue',
		 radioClass: 'iradio_flat-green'
	});


});
