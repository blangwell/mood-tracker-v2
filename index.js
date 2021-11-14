require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const db = require(path.join(__dirname, 'models'));

const app = express();
const controllers = require(path.join(__dirname, 'controllers', 'index.js'));
const authControllers = require(path.join(__dirname, 'controllers', 'auth.js'));
const moodControllers = require(path.join(__dirname, 'controllers', 'mood.js'));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ 
	secret: process.env.SESSION_SECRET, 
	resave: false, 
	saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/ppConfig')(passport);

// ROUTES
app.get('/', controllers.getHome);

app.get('/login', authControllers.getLogin);
app.post('/login', authControllers.postLogin);
app.get('/logout', authControllers.getLogout);
app.post('/newuser', authControllers.postNewUser);
// app.post('/updateuser', authControllers.postUpdateUser);
app.get('/allmoods', moodControllers.getAllMoods);
app.post('/mood', moodControllers.postMood);

app.get('/allmoods', )

app.listen(process.env.PORT, async () => {
	console.log(`listenin' on port ${process.env.PORT}`);
});
