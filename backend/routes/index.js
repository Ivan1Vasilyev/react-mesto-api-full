const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const loginRouter = require('./login');
const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use(loginRouter);
router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);

module.exports = router;
