require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mood-tracker-v2", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', err => console.log(err));

// module.exports.Mood = require('./Mood');
// module.exports.User = require('./User');