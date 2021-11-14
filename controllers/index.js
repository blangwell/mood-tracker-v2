const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getHome = (req, res) => {
	console.log('home route hit');
	res.json('GET home route');

};

exports.getLogin = (req, res) => {
	res.send('GET login route');
};

// exports.postNewUser = (req, res) => {
// 	let newUser = new User({
// 		email: req.body.email,
// 		password: req.body.password
// 	});

// 	// salt and hash password
// 	let saltRounds = 10;
// 	if (req.body.password === req.body.confirmPassword) {
// 		bcrypt.genSalt(saltRounds, (err, salt) => {
// 			bcrypt.hash(req.body.password, salt, (err, hash) => {
// 				if (err) { throw err; }
// 				newUser.password = hash;
// 				newUser.save()
// 				.then(createdUser => res.json(createdUser))
// 				.catch(err => console.log(err));
// 			});
// 		});
// 	}
// };