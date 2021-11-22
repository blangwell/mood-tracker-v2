require('dotenv').config();
const cors = require('cors');
const path = require('path');
const db = require(path.join(__dirname, 'models'));
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const controllers = require(path.join(__dirname, 'controllers', 'index.js'));
const authControllers = require(path.join(__dirname, 'controllers', 'auth.js'));
const moodControllers = require(path.join(__dirname, 'controllers', 'mood.js'));

app.use(cors({
	origin: 'http://localhost:3000',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(session({ 
	secret: process.env.SESSION_SECRET, 
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI_LOCAL }),
	resave: false, 
	saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/ppConfig')(passport);

// ENDPOINTS
app.get('/', controllers.getHome);

// auth endpoints
app.get('/user', authControllers.getUser);
app.get('/login', authControllers.getLogin);
app.post('/login', authControllers.postLogin);
app.get('/logout', authControllers.getLogout);
app.post('/newuser', authControllers.postNewUser);
// app.post('/updateuser', authControllers.postUpdateUser);

// mood endpoints
app.get('/allmoods', moodControllers.getAllMoods);
app.post('/mood', moodControllers.postMood);

app.listen(process.env.PORT, async () => {
	console.log(`listenin' on port ${process.env.PORT}`);
});
