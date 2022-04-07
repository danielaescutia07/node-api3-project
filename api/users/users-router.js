const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');
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

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const createdUser = await User.insert({name: req.name});
    res.status(201).json(createdUser)
  } catch(err) {
    next(err)
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  const { id } = req.user;
  try {
    const updatedUser = await User.update(id, {name: req.name})
    res.status(200).json(updatedUser)
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  const { id } = req.user;
  try {
    await User.remove(id);
    res.status(200).json(req.user)
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  const { id } = req.user;
  try {
    const userPosts = await User.getUserPosts(id)
    res.status(200).json(userPosts)
  } catch (err) {
    next(err);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  const { id } = req.user;
  try {
    const createdPost = await Post.insert({
      user_id: id,
      text: req.text
    })
    res.status(201).json(createdPost);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandling);
// do not forget to export the router
module.exports = router;
