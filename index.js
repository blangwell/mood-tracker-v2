require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require(path.join(__dirname, 'controllers', 'index.js'));
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ 
	secret: process.env.SESSION_SECRET, 
	resave: false, 
	saveUninitialized: false 
}));
app.use(passport.initialize())
app.use(passport.session());
require('./config/ppConfig')(passport);

// ROUTES
app.get('/', controllers.getHome);
app.get('/success', (req, res) => {
	res.send('success!!!!');
})
app.get('/login', controllers.getLogin);
app.post('/login', passport.authenticate('local', { 
	failureRedirect: '/login',
	successRedirect: '/success'
}));
app.post('/newuser', controllers.postNewUser);

app.listen(process.env.PORT, async () => {
	console.log(`listenin' on port ${process.env.PORT}`);
});
