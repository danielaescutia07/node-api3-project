function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`${method} ${url} ${timestamp}`);
  next();
}

function validateUserId(req, res, next) {
  console.log('validateUserId Middleware');
  next();
}

function validateUser(req, res, next) {
  console.log('validateUser Middleware');
  next();
}

function validatePost(req, res, next) {
  console.log('validatePost Middleware');
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
