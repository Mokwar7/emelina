const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  article: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  brand: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: true,
  },
  material: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  availble: {
    type: Boolean,
    required: true,
  },
  image1: {
    type: String,
    require: true,
    validate: { // set validation of parametr
      validator: (data) => {
        const regex = /^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/gmi; // eslint-disable-line no-useless-escape
        return regex.test(data); // test link by regex and send res
      },
      message: 'Это не ссылка', // if regex false then send error and this text
    },
  },
  image2: {
    type: String,
    require: true,
    validate: { // set validation of parametr
      validator: (data) => {
        const regex = /^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/gmi; // eslint-disable-line no-useless-escape
        return regex.test(data); // test link by regex and send res
      },
      message: 'Это не ссылка', // if regex false then send error and this text
    },
  },
  image3: {
    type: String,
    require: true,
    validate: { // set validation of parametr
      validator: (data) => {
        const regex = /^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/gmi; // eslint-disable-line no-useless-escape
        return regex.test(data); // test link by regex and send res
      },
      message: 'Это не ссылка', // if regex false then send error and this text
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (data) => {
        const regex = /^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/gmi; // eslint-disable-line no-useless-escape
        return regex.test(data);
      },
      message: 'Это не ссылка',
    },
  },
  sizesNprices: {
    type: Array,
    required: true,
  }
});

module.exports = mongoose.model('catalog', catalogSchema);
