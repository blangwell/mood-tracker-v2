const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

async function validPassword(password, foundPassword) {
	try {
		let isMatch = await bcrypt.compare(password, foundPassword);
		if (isMatch === true) {
			console.log('password is correct!');
			return true;
		} else {
			console.log('password is not correct');
			return false;
		}
	} catch (err) {
		return false;
	}
}

module.exports = (passport) => {
	passport.use(new LocalStrategy({ usernameField: 'email' },
		function(email, password, done) {
			User.findOne({ email: email }, function(err, foundUser) {
				if (err) { 
					return done(err); 
				}
				if (!foundUser) { 
					return done(null, false, { message: "User not found!" });
				}
				if (!validPassword(password, foundUser.password)) {
					console.log(foundUser);
					return done(null, false, { message: "Incorrect password!" });
				}
				return done(null, foundUser);
			});
		}
	));
}