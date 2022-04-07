const User = require('../users/users-model');

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`${method} ${url} ${timestamp}`);
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
    } else {
      req.user = user;
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({
      message: 'Missing required name field'
    });
  } else {
    req.name = name.trim()
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({
      message: 'Missing required text field'
    });
  } else {
    req.text = text.trim()
    next();
  }
}

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: 'Something went wrong',
    error: err.message,
    stack: err.stack
  }) 
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  errorHandling
}
