const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
	date: Date,
	sleep: Number,
	depressed: Number,
	manic: Number,
	irritable: Number,
	anxious: Number,
	psychotic: Boolean,
	therapy: Boolean,
});

exports.Mood = mongoose.model('Mood', moodSchema);