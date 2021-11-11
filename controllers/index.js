const mongoose = require('mongoose');

exports.getHome = (req, res) => {
	res.send('home route hit!');
};