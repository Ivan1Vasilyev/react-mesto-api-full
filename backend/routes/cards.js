const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { CARD_ID_ROUTE, CARD_LIKES_ROUTE } = require('../utils/constants');
const { deleteCard, getCards, createCard, likeCard, dislikeCard } = require('../controllers/cards');
const { joiNameOrAbout, joiUrl, joiId } = require('../utils/joi-validators');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: joiNameOrAbout(true),
      link: joiUrl(true),
    }),
  }),
  createCard,
);

router.delete(
  CARD_ID_ROUTE,
  celebrate({ params: Joi.object().keys({ cardId: joiId() }) }),
  deleteCard,
);

router.put(
  CARD_LIKES_ROUTE,
  celebrate({ params: Joi.object().keys({ cardId: joiId() }) }),
  likeCard,
);

router.delete(
  CARD_LIKES_ROUTE,
  celebrate({ params: Joi.object().keys({ cardId: joiId() }) }),
  dislikeCard,
);

module.exports = router;
