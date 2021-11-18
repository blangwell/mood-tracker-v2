exports.getHome = (req, res) => {
	// console.log(req.user);
	res.json(req.user);
};