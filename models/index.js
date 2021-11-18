// require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_LOCAL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
db.on('error', err => console.log(err));