const CREATED_CODE = 201;
const DEFAULT_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const NOT_CORRECT_MESSAGE = 'Некорректные данные';
const NOT_EXISTS_MESSAGE = 'Несуществующий путь';
const REGEXP_URL = /^https?:\/\/(www.)?[-.:/?#@!$&%'()_+~,;=a-zA-Z0-9]+$/;
const CARD_ID_ROUTE = '/:cardId';
const CARD_LIKES_ROUTE = `${CARD_ID_ROUTE}/likes`;
const CARDS_ROUTE = '/cards';
const USER_ME_ROUTE = '/me';
const USER_AVATAR_ROUTE = '/me/avatar';
const USERS_ROUTE = '/users';
const SIGN_IN_ROUTE = '/signin';
const SIGN_UP_ROUTE = '/signup';
const SIGN_OUT_ROUTE = '/signout';
const DEFAULT_ROUTE = '/api';

module.exports = {
  CREATED_CODE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  NOT_CORRECT_MESSAGE,
  NOT_EXISTS_MESSAGE,
  REGEXP_URL,
  CARD_ID_ROUTE,
  CARD_LIKES_ROUTE,
  CARDS_ROUTE,
  USER_ME_ROUTE,
  USER_AVATAR_ROUTE,
  USERS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  SIGN_OUT_ROUTE,
  DEFAULT_ROUTE,
};
