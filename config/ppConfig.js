const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.use(new LocalStrategy({ usernameField: 'email'},
	function(email, password, done) {
		db.User.findOne({ email: email }, function(err, user) {
			if (err) { 
				return done(err); 
			}
			if (!user) {
				return done(null, false, { message: "User not found!" });
			}
			if (!user.validatePassword(password)) {
				return done(null, false, { message: "Incorrect password!" });
			}
			return done(null, user);
		});
	}
));