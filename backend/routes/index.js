const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const loginRouter = require('./login');
const auth = require('../middlewares/auth');
const { CARDS_ROUTE, USERS_ROUTE } = require('../utils/constants');

router.use(loginRouter);
router.use(auth);
router.use(CARDS_ROUTE, cardRouter);
router.use(USERS_ROUTE, userRouter);

module.exports = router;
