const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

exports.getLogin = (req, res) => {
	res.send('GET login route');
};

exports.postLogin = passport.authenticate('local', { 
	failureRedirect: '/login',
	successRedirect: '/'
});

exports.getLogout = (req, res) => {
  req.logout();
	console.log('logged out!');	
  res.redirect('/');
};

exports.postNewUser = (req, res) => {
	let newUser = new User({
		email: req.body.email,
		password: req.body.password
	});
	let saltRounds = 10; 
	if (req.body.password === req.body.confirmPassword) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				if (err) { throw err; }
				newUser.password = hash;
				newUser.save()
				.then(createdUser => res.json(createdUser))
				.catch(err => console.log(err));
			});
		});
	}
};