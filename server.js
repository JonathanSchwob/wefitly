const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const passport = require('./modules/auth.js');
const cookieParser = require('cookie-parser');
const TrainerModel = require('./modules/db/trainerMethods.js');
const UserModel = require('./modules/db/userMethods.js');
const UserController = require('./modules/db/UserController.js');
const TrainerController = require('./modules/db/trainerController.js');
const BookingController = require('./modules/db/BookingController.js');
const ReviewController = require('./modules/db/reviewController.js');

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once('open', () => {
  console.log('database connected!');
});

const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
var MemoryStore = session.MemoryStore;
app.use(session({
  secret: 'themitochondriaisthepowerhouseofthecell',
  resave: true,
  store: new MemoryStore(),
  saveUninitialized: true,
  httpOnly: false
}));

// app.use(passport.initialize());
// app.use(passport.session());

app.post('/api/userSignup', UserController.signup);
app.get('/api/userSignup', UserController.checkEmail);
app.post('/api/userSignin', UserController.signin);
app.get('/api/userSignin', UserController.getUser);
app.post('/api/trainerSignup', TrainerController.signup);
app.get('/api/trainerSignup', TrainerController.checkEmail);
app.post('/api/trainerSignin', TrainerController.signin);
app.get('/api/filterTrainers', TrainerController.filter);
app.get('/api/getAllTrainers', TrainerController.getAll);
app.post('/api/updateTrainer', TrainerController.updateTrainer);
app.post('/api/logout', TrainerController.logout);
app.get('/api/getprofile', TrainerController.getProfile);
app.post('/api/bookings', BookingController.addBooking);
app.get('/api/bookings', BookingController.displayBookings);
app.put('/api/bookings', BookingController.confirmBooking);
app.get('/api/userBookings', BookingController.displayUserBookings);
app.delete('/api/bookings', BookingController.deleteBooking);
app.get('/api/reviews', ReviewController.getAll);
app.post('/api/reviews', ReviewController.postOne);
app.put('/api/chat', BookingController.addMessage);
// mongoose.connection('mongodb://localhost/')
// const db = mongoose.connection;

const port = process.env.PORT || 3100;

app.use(express.static(path.join(__dirname + '/client/public')));

app.listen(port, () => {
  console.log('listening on port: ', port);
});
