const { celebrate, Joi } = require('celebrate');
const { REGEXP_URL } = require('./constants');

const joiUserInfo = (required) => (required
  ? Joi.string().required().min(2).max(30)
  : Joi.string().min(2).max(30));
const joiUrl = (required) => (required
  ? Joi.string().required().pattern(REGEXP_URL)
  : Joi.string().pattern(REGEXP_URL));
const joiEmail = () => Joi.string().required().email({ minDomainSegments: 2 });
const joiPassword = () => Joi.string().required().min(4);
const joiId = () => Joi.string().hex().required().length(24);
const joiCustomId = (source, id) => celebrate(
  { [source]: Joi.object().keys({ [id]: joiId() }) },
);

const joivalidateRegister = () => celebrate({
  body: Joi.object().keys({
    email: joiEmail(),
    password: joiPassword(),
    nameReg: joiUserInfo(),
    aboutReg: joiUserInfo(),
    avatarReg: joiUrl(),
  }),
});

const joiValidateLogin = () => celebrate({
  body: Joi.object().keys({
    email: joiEmail(),
    password: joiPassword(),
  }),
});

const joiValidateUserInfo = () => celebrate({
  body: Joi.object().keys({
    name: joiUserInfo(true),
    about: joiUserInfo(true),
  }),
});

const joiValidateUserAvatar = () => celebrate(
  { body: Joi.object().keys({ avatar: joiUrl(true) }) },
);

const joiValidateUserId = () => joiCustomId('body', '_id');

const joiValidateCardId = () => joiCustomId('params', 'cardId');

const joiValidateCard = () => celebrate({
  body: Joi.object().keys({
    name: joiUserInfo(true),
    link: joiUrl(true),
  }),
});

module.exports = {
  joivalidateRegister,
  joiValidateLogin,
  joiValidateUserId,
  joiValidateCard,
  joiValidateCardId,
  joiValidateUserInfo,
  joiValidateUserAvatar,
};
