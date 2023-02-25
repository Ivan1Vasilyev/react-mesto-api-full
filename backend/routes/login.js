const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { SIGN_IN_ROUTE, SIGN_UP_ROUTE, SIGN_OUT_ROUTE } = require('../utils/constants');
const { login, createUser, logout } = require('../controllers/users');
const { joiNameOrAbout, joiUrl, joiEmail, joiPassword, joiId } = require('../utils/joi-validators');

router.post(
  SIGN_IN_ROUTE,
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      password: joiPassword(),
    }),
  }),
  login,
);

router.post(
  SIGN_UP_ROUTE,
  celebrate({
    body: Joi.object().keys({
      email: joiEmail(),
      password: joiPassword(),
      name: joiNameOrAbout(),
      about: joiNameOrAbout(),
      avatar: joiUrl(),
    }),
  }),
  createUser,
);

router.post(SIGN_OUT_ROUTE, celebrate({ body: Joi.object().keys({ _id: joiId() }) }), logout);

module.exports = router;
