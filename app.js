require('dotenv').config();

const express = require('express'); // express to communicate with mongodb

const mongoose = require('mongoose'); // mongodb

const cors = require('cors'); // cors to allow connect from other sites

const { celebrate, Joi, errors } = require('celebrate'); // validation

const app = express(); // create app 

app.use(cors({
  origin: ['http://192.168.103.52:5173', 'http://localhost:5173', 'http://130.193.58.197'], // allow to connect to this server just from this 3 urls
}));

const { PORT = 3001 } = process.env; // create default port for server

const auth = require('./middlewares/auth'); // import func to check auth user to get allow to other functions of server

const { requestLogger, errorLogger } = require('./middlewares/logger'); // logger of all requests to the server

const { register, login } = require('./controllers/user'); // import controllers of models and acces to them by link "*/some-url"

const NotFindError = require('./utils/notFindError'); // import 404 error

mongoose.connect('mongodb://localhost:27017/test4', { // create new db with name bitfilmsdb or connect to availible db with name bitfilmsdb
  useNewUrlParser: true, // new url analizator (need to correct work server)
})
  .then(() => {
    console.log('All is fine'); // if all is ok
  })
  .catch((err) => {
    console.log(err); // if errors with creating or connect
  });

app.use(express.json()); // convert all results to json format
app.use(requestLogger); // make logs of all request under this line

app.post('/signup', celebrate({ // create user by send request on /signup and validate data
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(), // name 2-30 required
    email: Joi.string().email().required(), // email required email syntax
    password: Joi.string().min(8).required(), // password 8> required
    tg: Joi.string().min(2).max(50).required(),
  }),
}), register);
app.post('/signin', celebrate({ // login user
  body: Joi.object().keys({
    email: Joi.string().required().email(), // name 2-30 required
    password: Joi.string().min(8).required(), // password 8> required
  }),
}), login);

app.use(require('./routes/indexOut.js')); // all availeble routes in this file

app.use(auth); // check auth user to protect other routes

app.use(require('./routes/index')); // all availeble routes in this file


app.use('*', (req, res, next) => { // get all errors and send next
  next(new NotFindError('Данная страница не найдена'));
});

app.use(errorLogger); // make logs of all errors
app.use(errors()); // check errors and send next

app.use((err, req, res, next) => { // get all errors
  const { statusCode = 500, message } = err; // get errors and make default errors

  res
    .status(statusCode) // set status from error
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message, //send error message
    });

  next(); // send nextÍÍ
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
