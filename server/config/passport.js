const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

module.exports = function (passport) {
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize user
    passport.deserializeUser(function (id, done) {
        User.findByPk(id)
        .then(user => {
            done(null, user);
        })
        .catch(error => {
            console.log(error);
            done(error, null);
        });
    });

    // Signup
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with username
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                .then(user => {
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'the username is already taken'));
                    } else {
                        User.create({
                                nombre: req.body.username,
                                username: req.body.username,
                                password: req.body.password,
                            })
                            .then(user => {
                                return user
                                    .update({
                                        nombre: req.body.nombre || user.nombre,
                                        username: req.body.username,
                                        password: user.generateHash(req.body.password),
                                    })
                                    .then(user => {
                                        return done(null, user);
                                    })
                                    .catch((error) => {
                                        return done(error, null);
                                    });
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    }
                });
        }));

    // login
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                .then(user => {
                    //if (err) return done(err);
                    if (!user) {
                        console.log("No User found");
                        return done(null, false, req.flash('loginMessage', 'No User found'))
                    }
                    if (!user.validPassword(password)) {
                        console.log("Wrong. password");
                        return done(null, false, req.flash('loginMessage', 'Wrong. password'));
                    }
                    return done(null, user);
                })
                .catch(error => {
                    console.log(error)
                });;
        }));

}