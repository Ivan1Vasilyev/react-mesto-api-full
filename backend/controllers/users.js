const bcryptjs = require('bcryptjs');

const escape = require('escape-html');
const User = require('../models/users');
const {
  INVALID_USER_ID_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  SAME_EMAIL_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  CREATED_CODE,
  COOKIES_DURATION,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found');
const InvalidError = require('../errors/Invalid');
const NotAuthorizedError = require('../errors/not-authorized');
const SameEmailError = require('../errors/same-email');
const { getErrorMessages, jwtSign, setCookies } = require('../utils/helpers');

const getUserData = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
    }
    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new InvalidError(INVALID_USER_ID_MESSAGE));
    }
    return next(e);
  }
};

const updateUser = async (req, res, next, updates) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      runValidators: true,
      new: true,
    });

    if (!updatedUser) {
      return next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
    }

    return res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new InvalidError(getErrorMessages(e)));
    }
    return next(e);
  }
};

const upDateUserData = async (req, res, next) => {
  const { name, about } = req.body;
  return updateUser(req, res, next, { name: escape(name), about: escape(about) });
};

const upDateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  return updateUser(req, res, next, { avatar });
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcryptjs.hash(req.body.password, 10);
    const { name, about, avatar, email } = req.body;
    const newUser = await User.create({
      name: name ? escape(name) : name,
      about: about ? escape(about) : about,
      avatar,
      email,
      password: hash,
    });
    return res.status(CREATED_CODE).json({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new InvalidError(getErrorMessages(e)));
    }
    if (e.code === 11000) {
      return next(new SameEmailError(SAME_EMAIL_MESSAGE));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new NotAuthorizedError(LOGIN_ERROR_MESSAGE));
    }

    const isLogged = await bcryptjs.compare(password, user.password);
    if (!isLogged) {
      return next(new NotAuthorizedError(LOGIN_ERROR_MESSAGE));
    }

    const token = jwtSign(user, '7d');

    return res
      .cookie('jwt', token, setCookies(COOKIES_DURATION))
      .json({ message: LOGIN_MESSAGE });
  } catch (e) {
    return next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
    }

    const token = jwtSign(user, 0);

    return res
      .cookie('jwt', token, setCookies(0))
      .json({ message: LOGOUT_MESSAGE });
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new InvalidError(INVALID_USER_ID_MESSAGE));
    }
    return next(e);
  }
};

module.exports = {
  createUser,
  upDateUserData,
  upDateUserAvatar,
  login,
  getUserData,
  logout,
};
