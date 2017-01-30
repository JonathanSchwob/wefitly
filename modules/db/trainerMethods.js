const TrainerSchema = require('./trainerSchema.js').TrainerSchema;
const TrainerModel = require('./trainerSchema.js').TrainerModel;
const Q = require('q');
const passwordHelpers = require('./passwordHelpers.js')

const findTrainer = Q.nbind(TrainerModel.findOne, TrainerModel);
const findAllTrainers = Q.nbind(TrainerModel.find, TrainerModel);



TrainerModel.signup = (user, next) => {
  passwordHelpers.signup(user, TrainerModel, next);
}

TrainerModel.comparePassword = (email, candidatePassword, next) =>{
  passwordHelpers.comparePassword(email, candidatePassword, findTrainer, next);
}

TrainerModel.findAllTrainers = (next) => {
  findAllTrainers({})
  .then((results) => {
    return next(results);
  })
  .catch((err) => {
    console.error(err);
  });
};

TrainerModel.filterTrainers = (location, next) => {
  findAllTrainers({ location: location }, { username: 1, location: 1, services: 1 } )
  .then((results) => {
    return next(results);
  })
  .catch((err) => {
    console.error(err);
  });
};

// methods to allow updating of trainer records
// updates is an object that corresponds to the key value pair
// of the schema
TrainerModel.updateTrainer = (trainerEmail, updates, next)=>{
  TrainerModel.update({username:trainerEmail},{$set:updates},function(err){
    if (err){
      next(err);
    }else{
      next();
    }
  })
}

module.exports = TrainerModel;
