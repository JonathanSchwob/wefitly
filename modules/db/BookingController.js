const BookingSchema = require('./bookingSchema.js');
const UserModel = require('./userSchema.js').UserModel;

module.exports = {

  addBooking: function(req, res) {
    UserModel.find({username: req.session.email}).exec(function(err, doc) {
      if (err) {
        res.sendStatus(501);
      } else {
        new BookingSchema({
          userFirstname: doc[0].firstname,
          userLastname: doc[0].lastname,
          userEmail: req.session.email,
          trainerName: req.body.trainerName,
          trainerEmail: req.body.trainerEmail,
          service: req.body.service,
          isBooked: !req.body.isBooked,
          duration: req.body.duration,
          date: req.body.date
        }).save((err) => {
          if (err) {
            res.sendStatus(501);
          } else {
            res.sendStatus(201);
          }
        });
      }
    });
  },

  displayBookings: function(req, res) {
    if (!req.session.email) {
      res.send('no email');
    } else {
      BookingSchema.find({trainerEmail: req.session.email}).exec(function(err, booking) {
        if (err) {
          console.error(err); 
        } else {
          res.send(booking);
        }
      });
    }
  },

  displayUserBookings: function(req, res) {
    if (!req.session.email) {
      res.send('no email');
    } else {
      BookingSchema.find({userEmail: req.session.email}).exec(function(err, booking) {
        if (err) {
          console.error(err); 
        } else {
          res.send(booking);
        }
      });
    }
  },

  confirmBooking: function(req, res) {
    BookingSchema.findByIdAndUpdate(
      req.body._id,
      {$set: { isBooked: true } }
    ).exec(function(err, booking) {
      if (err) {
        console.error(err);
      } else {
        res.end();
      }
    });
  },

  deleteBooking: function(req, res) {
    BookingSchema.remove({_id: req.body._id}).exec(function(err, booking) {
      if (err) {
        console.error(err);
      } else {
        res.end();
      }
    });
  },

  addMessage: function(req, res) {
    BookingSchema.findByIdAndUpdate(req.body._id, {$push: {messages: message}}).then(function () {
      if (err) {
        console.error(err);
      } else {
        res.end('message sent');
      }
    });
  }
};
