const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const colors = require('colors');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const STATUS_USER_ERROR = 422;

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  console.log(
    `encryptUserPW username: ${username} password: ${password}`.green
  );
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // Once the password is encrypted using bcrypt, you'll need to save the user the DB.
  // Once the user is set, take the savedUser and set the returned document from Mongo on req.user
  // call next to head back into the route handler for encryptUserPW
  try {
    // generate the salt
    bcrypt.genSalt(SaltRounds, (err, salt) => {
      if (err) {
        console.log(`salt err: ${err}`.red);
        return next(err);
      }
      console.log(`typeof salt: ${typeof salt}`.green);
      // hash password
      bcrypt.hash(password, salt, (err, hash) => {
        console.log(`hash returned`.green);
        if (err) {
          console.log(`hash err: ${err}`.red);
          return next(err);
        }
        req.user = new User({ username, password: hash });
        console.log(`set req.user: ${req.user}`.green);
        return next();
      });
    });
  } catch (err) {
    console.log(`thrown exception err: ${err}`.red);
    return next(err);
  }
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
  User.findOne({ username })
    .exec()
    .then(user => {
      console.log(`compareUserPW db user: ${user}`.yellow);
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) return next(new Error("passwords don't match"));
        req.username = username;
        return next();
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
