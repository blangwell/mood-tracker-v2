require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const controllers = require(path.join(__dirname, 'controllers', 'index.js'));
const MONGO_URI = process.env.MONGO_URI_LOCAL;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', controllers.getHome);

mongoose.connection.on('connecting', () => {
	console.log(`connecting to mongo...`);
});
mongoose.connection.on('connected', () => {
	console.log(`connected to mongo at ${MONGO_URI}`);
});
mongoose.connection.on('error', err => {
	console.error(err);
});

app.listen(process.env.PORT, async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log(`listenin' on port ${process.env.PORT}`);
	} catch (err) {
		console.error(err);
	}
});
