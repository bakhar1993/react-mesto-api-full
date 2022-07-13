const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictingRequest = require('../errors/conflicting-request-err');

module.exports.getAllUsers = (req, res, next) => {
  User.find({}).then((data) => {
    if (data.length >= 1) {
      res.send({ users: data });
    } else {
      res.status(200).send({ message: 'Пользователи не найдены' });
    }
  }).catch((err) => {
    next(err);
  });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId).then((data) => {
    if (data) {
      res.send({ user: data });
    } else {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(BadRequestError('Некорректный ID'));
    } else {
      next(err);
    }
  });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).then((data) => {
    res.status(200).send({ user: data });
  }).catch((err) => {
    next(err);
  });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .catch((err) => {
          if (err.code === 11000) {
            next(ConflictingRequest('Пользователь с таким email уже зарегистрирован'));
          }
          next(err);
        })
        .then((user) => {
          res.send({ user });
        })
        .catch(
          (err) => {
            if (err.name === 'ValidationError') {
              next(BadRequestError('Переданы некорректные данные при создании пользователя'));
            }
            next(err);
          },
        );
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).then((data) => {
    if (data) {
      res.send({ user: data });
    } else {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
  }).catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(BadRequestError('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).then((data) => {
    if (data) {
      res.send({ user: data });
    } else {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
  }).catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(BadRequestError('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthorizedError('Не передан email или пароль');
  }
  User.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    return bcryptjs.compare(password, user.password).then((data) => {
      if (!data) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      return res.send({ token });
    });
  }).catch((err) => {
    next(err);
  });
};
