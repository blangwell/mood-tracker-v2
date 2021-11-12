const passport = require('passport');
const User = require('../models/User');

exports.getHome = (req, res) => {
	res.send('GET home route');

};

exports.getLogin = (req, res) => {
	res.send('GET login route');
}

exports.postLogin = (req, res) => {
	passport.authenticate('local', { 
		successRedirect: '/', 
		failureRedirect: '/login',
		failureFlash: true
	});
};

exports.postNewUser = (req, res) => {
	let newUser = new User(req.body);
	newUser.save()
	.then(user => {
		res.json(user);
	})
	.catch(err => {
		res.status(400).json("Error! " + err);
	})
}