const {
  authenticate,
  encryptUserPW,
  compareUserPW
} = require('../utils/middlewares');

const { getAllJokes, createUser, login } = require('../controllers');

module.exports = server => {
  server.get('/api/jokes', authenticate, getAllJokes);
  server
    .route('/api/users')
    .post(encryptUserPW, (req, res) => {
      createUser(req,res)
      .then((user) => {
      console.log(`user.err: ${user.err}  user.newUser: ${user.newUser}`.green);
      if (user.err) res.status(401).json({err: user.err});
      res.status(201).json(user.newUser);
      });
    }
      /* I need some controller Love*/);
  server.route('/api/login').post(compareUserPW, login);
};
