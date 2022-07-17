const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
// const UnauthorizedError = require('../errors/unauthorized-err');
const Forbidden = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({}).then((data) => {
    if (data.length >= 1) {
      res.send(data);
    } else {
      res.status(200).send({ message: 'Карточки не найдены' });
    }
  }).catch((err) => {
    next(err);
  });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((data) => {
    res.send(data);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(BadRequestError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).then((card) => {
    if (card) {
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(req.params.cardId).then((data) => {
          res.status(200).send(data);
        }).catch((err) => {
          if (err.name === 'CastError') {
            next(BadRequestError('Переданы некорректные данные при удалении карточки'));
          } else {
            next(err);
          }
        });
      } else {
        throw new Forbidden('Вы не можете удалять чужие карточки');
      }
    } else { throw new NotFoundError('Карточка с указанным _id не найдена'); }
  });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((data) => {
    if (data) {
      res.send(data);
    } else { throw new NotFoundError('Передан несуществующий _id карточки'); }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(BadRequestError('Переданы некорректные данные для постановки лайка'));
    } else {
      next(err);
    }
  });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((data) => {
    if (data) {
      res.send(data);
    } else { throw new NotFoundError('Передан несуществующий _id карточки'); }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(BadRequestError('Переданы некорректные данные для снятии лайка'));
    } else {
      next(err);
    }
  });
};
