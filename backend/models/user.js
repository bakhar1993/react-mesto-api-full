const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.([a-z]{2,4})([/\w]*)#?/gmi.test(link),
      message: 'Введена некорректная ссылка',
    },
  },
  email: {
    type: String,
    unique: true,
    require: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Введён некорректный Email',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
