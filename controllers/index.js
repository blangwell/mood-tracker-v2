const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getHome = (req, res) => {
	console.log('home route hit');
	res.json('GET home route');

};

exports.getLogin = (req, res) => {
	res.send('GET login route');
}

// exports.postLogin = async (req, res) => {
// 	User.find({ email: req.body.email })
// 	.then(result => {
// 		bcrypt.compare(req.body.password, result[0].password)
// 		.then(function(isMatch) {
// 			if (isMatch === true) {
// 				passport.authenticate('local', { 
// 					successRedirect: '/', 
// 					failureRedirect: '/login',
// 					failureFlash: true
// 				});
// 				console.log('AUTHENTICATED!');
// 			}
// 		})
// 		.catch(err => console.log(err));
// 	})
// 	.catch(err => {
// 		throw err;
// 	});
// };

exports.postNewUser = (req, res) => {
	let newUser = new User({
		email: req.body.email,
		password: req.body.password
	});

	// salt and hash password
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
}