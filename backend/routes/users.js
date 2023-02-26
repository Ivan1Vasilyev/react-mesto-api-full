const router = require('express').Router();
const { upDateUserData, upDateUserAvatar, getUserData } = require('../controllers/users');
const { joiValidateUserInfo, joiValidateUserAvatar } = require('../utils/joi-validators');

router.get('/me', getUserData);

router.patch(
  '/me',
  joiValidateUserInfo(),
  upDateUserData,
);

router.patch(
  '/me/avatar',
  joiValidateUserAvatar(),
  upDateUserAvatar,
);

module.exports = router;
