const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { USER_ME_ROUTE, USER_AVATAR_ROUTE } = require('../utils/constants');
const { upDateUserData, upDateUserAvatar, getUserData } = require('../controllers/users');
const { joiNameOrAbout, joiUrl } = require('../utils/joi-validators');

router.get(USER_ME_ROUTE, getUserData);

router.patch(
  USER_ME_ROUTE,
  celebrate({
    body: Joi.object().keys({
      name: joiNameOrAbout(true),
      about: joiNameOrAbout(true),
    }),
  }),
  upDateUserData,
);

router.patch(
  USER_AVATAR_ROUTE,
  celebrate({ body: Joi.object().keys({ avatar: joiUrl(true) }) }),
  upDateUserAvatar,
);

module.exports = router;
