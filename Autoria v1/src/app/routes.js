module.exports = (app, passport) => {
    
    // index route
    app.get('/', (req,res) => { 
        res.render('index');
    });

    //login view
    app.get('/login', (req,res) => { 
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login',passport.authenticate('local-login', {	
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    }))
    if (role='user') {
      console.log('rol usuario');
      //agregar redireccionamiento del admin
    };

    // signup view
    app.get('/signup', (req,res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/login',
      failureRedirect: '/signup',
      failureFlash: true // allow flash messages
    }));
    
    //profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
      user: req.user,
      role: req.role
		});
  });
    
    //generate ticket
  app.get('/ticket', isLoggedIn, (req, res) => {
		res.render('ticket', {
			user: req.user
		});
  });

    //chatbot
  app.get('/chatbot', isLoggedIn, (req, res) => {
		res.render('chatbot', {
			user: req.user
		});
  });

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
    return next();
	}
	res.redirect('/');
}