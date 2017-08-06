
Meteor.startup(function () {
	Meteor.subscribe('user');
	Session.set({view: "contentHome"});
	Session.set("sites",[]);
	Session.set("building",[]);
	Session.set("view_incident_types",[]);
	// Router.go();
	// console.log(Router.current().route.getName());

	// $.validator.setDefaults({
   //  rules: {
   //      'caller-name': {
   //          required: true,
	// 			minlength: 3
   //      },
   //      'phone-number': {
   //          required: true,
	// 			minlength: 10
   //      }
   //  },
   //  messages: {
   //      'caller-name': {
   //          required: "You must enter a name."
   //      },
   //      'phone-number': {
   //          required: "You must enter a phone number.",
   //          minlength: "Your phone number must be at least {0} characters."
   //      }
   //  }
	//});
});

///////////////
/// helpers
//////////////
Template.createMajorIncident.helpers({
	getMajorIncidentSteps: function() {
		return Session.get("view_create_incident");
	}
});

Template.login.helpers({

});

Template.dashboard.helpers({
	getContent: function() {
		return Session.get("view");
	}
});

Template.incidentDesc.helpers({
	getSites: function() {
	  return Session.get("sites");
  	},
  	getBlgNum: function(code) {
	  return Session.get("building");
  	},
  	getIncidentTypes: function() {
	  return Session.get("view_incident_types");
  	},
  	getIncidentForm: function() {
	  var incidentTypes = Session.get('view_incident_types');
	  if(incidentTypes && incidentTypes.length > 0) {
		  return incidentTypes[0].code;
	  }
	  return "";
  	}
});

/////////////
/// events
/////////////

Template.createMajorIncident.events({
	'submit form': function(event) {
		event.preventDefault();
		console.log("SUBMITTED");
		var template = {};
		var inputs = $('#js-create-incident-form').find('input');
		inputs.each(function(index) {
			// console.log(this.value.length);
			if(this.value.length>0) {
				template[this.name] = this.value;
			}
		});
		if(event.target.className.indexOf("disabled")<0 &&
			(Session.get('callOrTicket.call') || Session.get('callOrTicket.ticket'))
		) {
			$($('form').children()[0]).animate({ right: '0%', opacity: 0.3 }, 400);
			setTimeout(function () {
				if(Session.get('view_create_incident').indexOf("callOrTicket")>=0) {
					Session.set({view_create_incident: 'callerInfo'});
				} else if(Session.get('view_create_incident').indexOf("callerInfo")>=0) {
					Session.set({caller: template});
					Session.set({view_create_incident: 'incidentDesc'});
				}
			}, 300)
		}
		return false;
	},
	'input input': function(event) {
		event.preventDefault();
		var inputs = $('form').find('input');
		inputs.each(function(index, input) {
			if(!input.value) {
				$('#js-create-inc-next-button').addClass('disabled');
				return;
			} else {
				if(index == inputs.length-1) {
					$('#js-create-inc-next-button').removeClass('disabled');
				}
			}
		});
	},
	'click #js-create-inc-previous-button': function(event) {
		event.preventDefault();
		var template = {};
		var inputs = $('#js-create-incident-form').find('input');
		inputs.each(function(index) {
			// console.log(this.value.length);
			if(this.value.length>0) {
				template[this.name] = this.value;
			}
		});
		$($('form').children()[0]).animate({ right: '0%', opacity: 0.3 }, 400);
		setTimeout(function () {
			if(Session.get('view_create_incident').indexOf("callerInfo")>=0) {
				Session.set({view_create_incident: 'callOrTicket'});
				Session.set({caller: template});
				$('#js-create-inc-previous-button').hide(500);
			} else if(Session.get('view_create_incident').indexOf("incidentDesc")>=0) {
				// console.log(template);
				Session.set({incidentDesc: template});
				Session.set({view_create_incident: 'callerInfo'});
			}
		}, 300)
		return false;
	}
});

Template.callOrTicket.events({
	'click #js-create-inc-next-button': function() {
	}
});

Template.callerInfo.events({

});

Template.incidentDesc.events({
	'input #site': function(event) {
		event.preventDefault();
		var query = event.target.value;
		Meteor.call('getSites', query.toLowerCase(), function (err, result) {
			if (result) {
				 Session.set("sites", result);
			} else if (err) {
				 console.log(err);
			}
		});
	},
	'input #building': function(event) {
		event.preventDefault();
		var query = event.target.value;
		var sites = Session.get("sites");
		var code = $('#site').val();
		Session.set(
			'building', sites[0].building || []
		);
	},
	'input #incident': function(event) {
		event.preventDefault();
		var query = event.target.value;
		// if(query) {
			Meteor.call('getIncidentTypes', query.toLowerCase(), function (err, result) {
				if (result) {
					 Session.set("view_incident_types", result);
				} else if (err) {
					 console.log(err);
				}
			});
		// }
	}
});

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
				if(result.failed) {
					console.log(result);
				} else {
					Meteor.loginWithPassword(username, result.token, function(error) {
						if(error){
							console.log(error);
						}
					});
				}
			}
		});
	  return;
	}
});

Template.sideMenu.events({
	'click #js-main-dashboard': function(event) {
		event.preventDefault();
		console.log("hello");
		Session.set({view: 'contentHome'});
	},
	'click #js-create-priority': function(event) {
		event.preventDefault();
		console.log('create');
		// $('#js-create-inc-previous-button').hide();
		// $('#js-create-inc-previous-button').addClass("disabled");
		// if(Session.get('callOrTicket.call') || Session.get('callOrTicket.ticket')) {
		// 	$('#js-create-inc-next-button').removeClass("disabled");
		// } else {
		// 	$('#js-create-inc-next-button').addClass("disabled");
		// }
		Session.set({'callOrTicket.call': false});
		Session.set({'callOrTicket.ticket': false});
		Session.set({view_create_incident: 'callOrTicket'});
		Session.set({view: 'createMajorIncident'});
		$('#js-create-inc-previous-button').hide(500);
		$('#js-create-inc-next-button').addClass("disabled");
		$('input').iCheck('uncheck');
		Session.set({caller: {}});
		Session.set({incidentDesc: {}});
		Router.go('/incident');
	}
});

Template.dashboard.events({
	'click .logout': function() {
		event.preventDefault();
        Meteor.logout();
	},
	'click .side-menu': function(event) {

	}

});

var stopEvent = function(event) {
	event.preventDefault();
	event.stopPropagation();
	// event.stopImmediatePropagation();
}

setContentHeight = function () {
	var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
		 $BODY = $('body'),
		 $MENU_TOGGLE = $('#menu_toggle'),
		 $SIDEBAR_MENU = $('#sidebar-menu'),
		 $SIDEBAR_FOOTER = $('.sidebar-footer'),
		 $LEFT_COL = $('.left_col'),
		 $RIGHT_COL = $('.right_col'),
		 $NAV_MENU = $('.nav_menu'),
		 $FOOTER = $('footer');

	// reset height
	$RIGHT_COL.css('min-height', $(window).height());

	var bodyHeight = $BODY.outerHeight(),
		footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
		leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
		contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

	// normalize content
	contentHeight -= $NAV_MENU.height() + footerHeight;

	$RIGHT_COL.css('min-height', contentHeight);
};

// Sidebar
function init_sidebar() {
// : This is some kind of easy fix, maybe we can improve this

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
	 $BODY = $('body'),
	 $MENU_TOGGLE = $('#menu_toggle'),
	 $SIDEBAR_MENU = $('#sidebar-menu'),
	 $SIDEBAR_FOOTER = $('.sidebar-footer'),
	 $LEFT_COL = $('.left_col'),
	 $RIGHT_COL = $('.right_col'),
	 $NAV_MENU = $('.nav_menu'),
	 $FOOTER = $('footer');


		// toggle small or large menu
		$MENU_TOGGLE.on('click', function() {
			console.log('clicked - menu toggle');

			if ($BODY.hasClass('nav-md')) {
				$SIDEBAR_MENU.find('li.active ul').hide();
				$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');

			} else {
				$SIDEBAR_MENU.find('li.active-sm ul').show();
				$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
			}

			$BODY.toggleClass('nav-md nav-sm');

			setContentHeight();

			$('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
		});

		// check active menu
		$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

		$SIDEBAR_MENU.find('a').filter(function () {
			return this.href == CURRENT_URL;
		}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
			setContentHeight();
		}).parent().addClass('active');

		// recompute content when resizing
		$(window).smartresize(function(){
			setContentHeight();
		});

		setContentHeight();

		// fixed sidebar
		if ($.fn.mCustomScrollbar) {
			$('.menu_fixed').mCustomScrollbar({
				autoHideScrollbar: true,
				theme: 'minimal',
				mouseWheel:{ preventDefault: true }
			});
		}
};
