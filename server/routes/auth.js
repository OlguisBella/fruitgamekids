module.exports = (app, passport) => {

	// index routes
	app.get('/auth', isNotLoggedIn, (req, res) => {
		res.render('index-admin');
	});

	
	app.get('/', isLoggedIn, (req, res) =>{
		res.render('index.ejs');
	});

	app.post('/', isLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//login view
	app.get('/login', isNotLoggedIn, (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', isNotLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', isNotLoggedIn, (req, res) => {
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', isNotLoggedIn, passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true // allow flash messages
        })
    );

	//admin view
	app.get('/adminmenu', isLoggedIn, (req, res) => {
		res.render('admin-menu.ejs');
	});

	app.get('/pregunta', isLoggedIn, (req, res) => {
		res.render('admin-pregunta.ejs');
	});
	app.get('/categoria', isLoggedIn, (req, res) => {
		res.render('admin-categoria.ejs');
	});
	app.get('/nivel', isLoggedIn, (req, res) => {
		res.render('admin-nivel.ejs');
	});
	app.get('/fruta', isLoggedIn, (req, res) => {
		res.render('admin-fruta.ejs');
	});
	app.get('/opcion', isLoggedIn, (req, res) => {
		res.render('admin-opcion.ejs');
	});
	
	app.post('/admin', isLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//evaluacion view	
	app.get('/evaluacion', isLoggedIn, (req, res) =>{
		res.render('evaluacion.ejs');
	});
	app.post('/evaluacion', isLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/evaluacion',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
    console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
        console.log("auntenticando");
		return next();
	} else
    	res.redirect('/login');
}

function isNotLoggedIn (req, res, next) {
    console.log(req.isAuthenticated());
	if (!req.isAuthenticated()) {
        console.log("auntenticando");
		return next();
	} else
    	res.redirect('/');
}