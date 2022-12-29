const jwt = require('jsonwebtoken');

const testJwt = (req, res, next) => {
  const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FjMTk4NDA4ZDk0OGQ2NGZiYTM3M2UiLCJpYXQiOjE2NzIzMTQzNjUsImV4cCI6MTY3MjkxOTE2NX0.spS8MideIh6bNKrBR6iwN5Q50pCIhEPpo79BOst914M';
  const SECRET_KEY_DEV = 'jwt-secret-key'; // вставьте сюда секретный ключ для разработки из кода
  console.log(YOUR_JWT);
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log(payload);
    console.log(
      '\x1b[31m%s\x1b[0m',
      `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `,
    );
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log('\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются');
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
    }
  }
  next();
};

module.exports = testJwt;
