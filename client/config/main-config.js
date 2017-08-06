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

Router.route('/incident', function() {
	this.render("dashboard", { to: 'main' });
});

Router.route('/dashboard', function() {
 	this.render("dashboard", { to: 'main' });
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
Template.createMajorIncident.onRendered(function() {
	$('#js-create-incident-form').validate({
		rules: {
			'caller': {
				required: true,
				minlength: 3
			},
			'phone': {
				required: true,
				minlength: 10
			},
			'department': {
				required: true,
				minlength: 3
			}
		},
		messages: {
			'caller': {
				 required: "You must enter the caller's name."
			},
			'phone': {
				 required: "You must enter a phone number."
			},
			'department': {
				 required: "You must enter the caller's department."
			}
	  	}
	});
	Session.set({'callOrTicket.call': false});
	Session.set({'callOrTicket.ticket': false});
	$('input#js-radio-call').iCheck('uncheck');
	$('input#js-radio-ticket').iCheck('uncheck');
	$('#js-create-inc-next-button').addClass("disabled");
	$('#js-create-inc-previous-button').hide(500);
});

/*----------------- Accounts -------------------------- */
Accounts.onLogin(function() {
	$('body').removeClass("hexcel");
	Router.go('/dashboard');
});

Accounts.onLogout(function() {
	$('body').addClass("hexcel");
	$('body').removeClass("nav-md");
	Session.keys = {};
	Router.go('/login');
});

/*-------------------- JS ------------------------------- */


/*------------------ iCheck ---------------------------- */
Template.callOrTicket.onRendered(function() {
	$('input.flat').iCheck({
		 checkboxClass: 'icheckbox_flat-blue',
		 radioClass: 'iradio_flat-green'
	});
	if(Session.get('callOrTicket.call')) {
		$('#js-create-inc-next-button').removeClass("disabled");
		$('input#js-radio-call').iCheck('check');
	} else if(Session.get('callOrTicket.ticket')) {
		$('input#js-radio-ticket').iCheck('check');
		$('#js-create-inc-next-button').removeClass("disabled");
	}
	$('input#js-radio-call').on('ifChecked', function(event) {
		$('#js-create-inc-next-button').removeClass("disabled");
		Session.set({'callOrTicket.call': true});
		Session.set({'callOrTicket.ticket': false});
	});
	$('input#js-radio-ticket').on('ifChecked', function(event) {
		$('#js-create-inc-next-button').removeClass("disabled");
		Session.set({'callOrTicket.ticket': true});
		Session.set({'callOrTicket.call': false});
	});
	$('input#js-radio-call').on('ifUnChecked', function(event) {
		$('#js-create-inc-next-button').addClass("disabled");
		Session.set({'callOrTicket.call': false});
	});
	$('input#js-radio-ticket').on('ifUnChecked', function(event) {
		$('#js-create-inc-next-button').addClass("disabled");
		Session.set({'callOrTicket.ticket': false});
	});
});

Template.callerInfo.onRendered(function() {
	var next = $('#js-create-inc-next-button');
	next.removeClass("disabled");
	$('#js-create-inc-previous-button').show(400);
	var caller = Session.get('caller') || {};
	var form = $("#js-create-incident-form");
	next.addClass(setWithPrevInput(caller, form));
	// enableNextButton(Object.keys(caller), form.find('input'), next);
});

function setWithPrevInput(InputObject, form) {
	var nextButtonState = "";
	var keys = (InputObject)?Object.keys(InputObject):[];
	if(InputObject && keys.length) {
		keys.forEach(function(key, index) {
			form.find('input[name*=' + key + ']').val(InputObject[key]);
			if(InputObject[key].length == 0) {
				nextButtonState = "disabled";
			}
		});
	}
	return nextButtonState;
}

function enableNextButton(keys, inputs, nextButton) {
	if(keys.length == inputs.length) {
		nextButton.removeClass('disabled');
	}
}

Template.incidentDesc.onRendered(function() {
	$('.datetimepicker').datetimepicker();
	var next = $('#js-create-inc-next-button');
	next.removeClass("disabled");
	var incidentDesc = Session.get('incidentDesc');
	var form = $("#js-create-incident-form");
	next.addClass(setWithPrevInput(incidentDesc, form));
});

// $('input.flat').iCheck();
Template.dashboard.onRendered(function() {
	$('input.flat').iCheck({
		 checkboxClass: 'icheckbox_flat-blue',
		 radioClass: 'iradio_flat-green'
	});
	var $BODY = $('body'),
	$LOGO = $("#main-logo");
	$MENU_TOGGLE = $('#menu_toggle'),
	$SIDEBAR_MENU = $('#sidebar-menu');
	$MENU_TOGGLE.on('click', function() {
		console.log('clicked - menu toggle');
		if ($BODY.hasClass('nav-md')) {
			$LOGO.attr("src","/images/logo/logo-white-hexa-1.png");
			$SIDEBAR_MENU.find('li.active ul').hide();
			$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
		} else {
			$LOGO.attr("src","");
			$LOGO.attr("src","/images/logo/logo-white.png");
			$SIDEBAR_MENU.find('li.active-sm ul').show();
			$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
		}
		$BODY.toggleClass('nav-md nav-sm');
		setContentHeight();
		$('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
	});

	// recompute content when resizing
	$(window).smartresize(function(){
		 setContentHeight();
	});

	setContentHeight();

	// Panel toolbox
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.css('height', 'auto');
        }
        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });
    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');
        $BOX_PANEL.remove();
    });

	 // Tooltip
     $('[data-toggle="tooltip"]').tooltip({
         container: 'body'
     });
	 // /Tooltip

	 // Progressbar
	//  if ($(".progress .progress-bar")[0]) {
	//      $('.progress .progress-bar').progressbar();
	//  }
	 // /Progressbar

	 // Switchery
   //   if ($(".js-switch")[0]) {
   //       var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
   //       elems.forEach(function (html) {
   //           var switchery = new Switchery(html, {
   //               color: '#26B99A'
   //           });
   //       });
   //   }
	 // /Switchery
});

Template.sideMenu.onRendered(function() {
	$SIDEBAR_MENU = $('#sidebar-menu');
	$SIDEBAR_MENU.find('a').on('click', function(ev) {
		 var $li = $(this).parent();

		 if ($li.is('.active')) {
			  $li.removeClass('active active-sm');
			  $('ul:first', $li).slideUp(function() {
					setContentHeight();
			  });
		 } else {
			  // prevent closing menu if we are on child menu
			  if (!$li.parent().is('.child_menu')) {
					$SIDEBAR_MENU.find('li').removeClass('active active-sm');
					$SIDEBAR_MENU.find('li ul').slideUp();
			  }

			  $li.addClass('active');

			  $('ul:first', $li).slideDown(function() {
					setContentHeight();
			  });
		 }
	});
});
