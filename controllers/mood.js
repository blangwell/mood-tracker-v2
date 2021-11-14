const Mood = require('../models/Mood');

exports.getAllMoods = async (req, res) => {
	let allMoods = await Mood.find({ userId: req.user.id });
	res.json(allMoods);
};

exports.postMood = async (req, res) => {
	// check if date entry already exists
	// if so, update. if not, create
	let today = new Date();
	let tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	let todaysMood = await Mood.findOneAndUpdate({ 
		userId: "618daf6ecbe6b21869145f9e",
		date: {
			$gte: today.toISOString(),
			$lt: tomorrow.toISOString()
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
	}, { new: true, upsert: true });

	res.json(todaysMood);
};