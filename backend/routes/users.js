const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { upDateUserData, upDateUserAvatar, getUserData } = require('../controllers/users');
const { joiNameOrAbout, joiUrl } = require('../utils/joi-validators');

router.get('/me', getUserData);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: joiNameOrAbout(true),
      about: joiNameOrAbout(true),
    }),
  }),
  upDateUserData,
);

router.patch(
  '/me/avatar',
  celebrate({ body: Joi.object().keys({ avatar: joiUrl(true) }) }),
  upDateUserAvatar,
);

module.exports = router;
