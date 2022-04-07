const express = require('express');
const User = require('./users-model');
const  {
  validateUserId,
  validateUser,
  validatePost,
  errorHandling
} = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const createdUser = await User.insert(req.body);
    res.status(200).json(createdUser)
  } catch(err) {
    next(err)
  }
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.text)
});

router.use(errorHandling);
// do not forget to export the router
module.exports = router;
