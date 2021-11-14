const Mood = require('../models/Mood');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const parseISO = require('date-fns/parseISO');

exports.getAllMoods = async (req, res) => {
	let allMoods = await Mood.find({ userId: req.user.id });
	res.json(allMoods);
};

exports.postMood = async (req, res) => {
	// check if date entry already exists
	// if so, update. if not, create
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	let todaysMood = await Mood.findOneAndUpdate({ 
		userId: "618daf6ecbe6b21869145f9e",
		date: {
			$gte: startOfDay(parseISO(req.body.date)),
			$lt: endOfDay(parseISO(req.body.date))
		}
	}, {  
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