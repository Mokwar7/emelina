const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const NotCorrectTokenError = require('../utils/notCorrectTokenError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (data) => validator.isEmail(data),
      message: 'Please enter valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  tg: {
    type: String,
    minlength: 2,
    unique: true,
    maxlength: 50,
    required: true,
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotCorrectTokenError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotCorrectTokenError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
