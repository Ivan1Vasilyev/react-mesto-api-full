const router = require('express').Router();
const { deleteCard, getCards, createCard, likeCard, dislikeCard } = require('../controllers/cards');
const { joiValidateCard, joiValidateCardId } = require('../utils/joi-validators');

router.get('/', getCards);

router.post(
  '/',
  joiValidateCard(),
  createCard,
);

router.delete(
  '/:cardId',
  joiValidateCardId(),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  joiValidateCardId(),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  joiValidateCardId(),
  dislikeCard,
);

module.exports = router;
