const CREATED_CODE = 201;
const DEFAULT_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const INVALID_USER_ID_MESSAGE = 'Некорректный id пользователя';
const INVALID_CARD_ID_MESSAGE = 'Некорректный id карточки';
const NOT_FOUND_MESSAGE = 'Несуществующий путь';
const NOT_FOUND_USER_MESSAGE = `${NOT_FOUND_MESSAGE}: Пользователь не найден.`;
const NOT_FOUND_CARD_MESSAGE = `${NOT_FOUND_MESSAGE}: Несуществующий id карточки`;
const SAME_EMAIL_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const LOGIN_ERROR_MESSAGE = 'Неправильные почта или пароль';
const NOT_OWNER_MESSAGE = 'Вы не можете удалить чужую карточку';
const AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const LOGIN_MESSAGE = 'Вы авторизованы!';
const LOGOUT_MESSAGE = 'Выход из профиля';
const REGEXP_URL = /^https?:\/\/(www.)?[-.:/?#@!$&%'()_+~,;=a-zA-Z0-9]+$/;
const COOKIES_DURATION = 3600000 * 24 * 7;

module.exports = {
  CREATED_CODE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  INVALID_CARD_ID_MESSAGE,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  NOT_FOUND_CARD_MESSAGE,
  SAME_EMAIL_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  NOT_OWNER_MESSAGE,
  AUTH_ERROR_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
  REGEXP_URL,
  COOKIES_DURATION,
};
