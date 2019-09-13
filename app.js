const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var formidable = require('express-form-data');
const methodOverride = require('method-override');

const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const session = require('express-session');

var path = require('path');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./server/config/passport')(passport);

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(formidable.parse({
  keepExtensions: true,
  uploadDir: "server/public/images"
}));
//use for override and can use put or delete
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser('asdf33g4w4hghjkuil8saef345'));
const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);
// required for passport
app.use(session({
  secret: 'asdf33g4w4hghjkuil8saef345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: cookieExpirationDate // use expires instead of maxAge
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/*
 * STATIC FILES
 */
//app.use(express.static('./server/public'));
app.use(express.static(path.join(__dirname, './server/public')));

//Configuracion para frontend
// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// Require our routes into the application.
require('./server/routes')(app);
require('./server/routes/auth')(app, passport);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.listen(process.env.PORT || 4000, function () {
    console.log('Your node js server is running');
  });

/*
 * MIDDLEWARES
 */



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;