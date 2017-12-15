const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  // there should be a user object set on req
  // use that req.user object to create a user and save it to our Mongo instance.
  return req.user.save()
  .then(newUser => { 
    console.log(`createUser newUser: ${newUser}`.green);
    return {err: null, newUser};
  })
  .catch(err => {
    console.log(`req.user.save err: ${err}`.red)
    return {err}
  })
};

module.exports = {
  createUser
};
