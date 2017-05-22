/*----------------- Route Configs ------------------*/
Router.configure({
    layoutTemplate: "ApplicationLayout"
} );

/*----------------- Routes -------------------------- */
Router.route('/login', function() {
   //  this.render("head", {to: "head"});
    this.render("login", {to: "main"});
   //  this.render("footer", {to: "footer"});
});

Router.route('/', function() {
   //  this.render("head", {to: "head"});
    this.render("login", {to: "main"});
   //  this.render("footer", {to: "footer"});
});
