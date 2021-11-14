exports.getHome = (req, res) => {
	console.log(req.user);
	res.send('GET home route');
};