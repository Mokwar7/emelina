const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  article: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
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
});

cartSchema.index({ article: 1, size: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('cart', cartSchema);