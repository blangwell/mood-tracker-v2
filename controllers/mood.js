const Mood = require('../models/Mood');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const parseISO = require('date-fns/parseISO');

exports.getAllMoods = async (req, res) => {
	// let uid = process.env.NODE_ENV === "production" ?
		// req.user.id : "618daf6ecbe6b21869145f9e";
	console.log(req);
	let uid = req.user.id;
	let allMoods = await Mood.find({ userId: uid });
	res.json(allMoods);
};

exports.postMood = async (req, res) => {
	// check if date entry already exists
	// if so, update. if not, create
	let uid = process.env.NODE_ENV === "production" ?
		req.user.id : "618daf6ecbe6b21869145f9e";

	let todaysMood = await Mood.findOneAndUpdate({ 
		userId: uid,
		date: {
			$gte: startOfDay(parseISO(req.body.date)),
			$lt: endOfDay(parseISO(req.body.date))
		}
	}, {  
		userId: uid,
		date: req.body.date,
		sleep: req.body.sleep,
		depressed: req.body.depressed,
		manic: req.body.manic,
		irritable: req.body.irritable,
		anxious: req.body.anxious,
		psychotic: req.body.psychotic,
		therapy: req.body.therapy,
	}, {
		new: true,
		upsert: true 
	});
	
	res.json(todaysMood);
};