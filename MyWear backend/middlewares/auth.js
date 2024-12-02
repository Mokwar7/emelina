const { NODE_ENV, JWT_SECRET } = process.env; // get status NODE_ENV == production or dev and jwt secret key to work server which generates on server one time
const jwt = require('jsonwebtoken'); // import jwt
const NotCorrectTokenError = require('../utils/notCorrectTokenError'); // import now correct token error

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // get authorization token from request

  if (!authorization) { // if authorization doesn't exist
    next(new NotCorrectTokenError('Необходима авторизация')); // send error and request to login
    return; // finish check authorization
  }

  const token = authorization.replace('Bearer ', ''); // delete extra info from token and leave just jwt key

  let payload; // make payload to put some data

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'); // verify token
  } catch (err) {
    next(new NotCorrectTokenError('Необходима авторизация')); // if errors send error and request to login
    return; // finish check authorization
  }

  req.user = payload; // if all is okay set payload to req.user

  next(); // allow to acces next requests 
};
