const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const User = require('../models/User');

exports.getUser = (req, res) => {
	res.send(req.user);
}

exports.getLogin = (req, res) => {
	res.send('GET login route');
};

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

exports.postSignup = (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				return res.status(400).json({ message: `Account associated with ${req.body.email} already exists!` })
			} else {
				const newUser = new User({
					email: req.body.email,
				});
				let saltRounds = 10;
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
		})
};

exports.postLogin = (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				res.status(400).json({ message: 'No user found! ' });
			} else {
				bcrypt.compare(req.body.password, user.password)
					.then(isMatch => {
						if (isMatch) {
							const payload = {
								id: user.id,
								email: user.email,
								displayName: user.displayName
							}

							jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
								res.json({
									success: true,
									token: `Bearer ${token}`
								})
							})
						} else {
							return res.status(400).json({ password: 'Password or email is incorrect ' });
						}
					});
			}
		});
};

// exports.postUpdateUser = async (req, res) => {
// 	console.log(req.user.id);
// 	try {
// 		let foundUser = await User.findOne({ id: req.user.id })
// 		res.json(foundUser);
// 	} catch (err) {
// 		res.redirect('/login');
// 	}
// }

// exports.postLogin = (req, res, next) => {
// 	passport.authenticate('local', (err, user, info) => {
// 		if (err) { throw err; }
// 		if (!user) {
// 			console.log('NO USER', req.user);
// 			res.send('');
// 		} else {
// 			req.logIn(user, err => {
// 				if (err) { throw err; }
// 				console.log(req.user);
// 				res.json(req.user);
// 			});
// 		}
// 	})(req, res, next);
// }