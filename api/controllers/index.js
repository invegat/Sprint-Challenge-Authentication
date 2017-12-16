const { getAllJokes } = require('./jokes');
const { login } = require('./login');
const { logout } = require('./logout');
const { createUser } = require('./user');

module.exports = {
  getAllJokes,
  login,
  logout,
  createUser
};
