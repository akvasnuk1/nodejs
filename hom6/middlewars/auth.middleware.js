const { statusCode, constants: { AUTHORIZATION, REFRESH } } = require('../constants');
const { OAuth } = require('../database');
const { ErrorHandler, errorMessage } = require('../error');
const { passwordHelper, authHelper } = require('../helpers');
const { userService } = require('../services');
const { authValidator } = require('../validators');

module.exports = {
  checkIsUserDataValid: async (req, res, next) => {
    try {
      const { error } = await authValidator.authLoginValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.NOT_VALID_DATA);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserExist: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findUserByEmail(email).select('+password');

      if (!user) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_NOT_EXISTS.message, errorMessage.USER_NOT_EXISTS.code);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsPasswordValid: async (req, res, next) => {
    try {
      const { password } = req.body;

      await passwordHelper.compare(password, req.user.password);

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, errorMessage.NO_TOKEN.message, errorMessage.NO_TOKEN.code);
      }

      await authHelper.verifyToken(token);

      const tokenObject = await OAuth.findOne({ accessToken: token });

      if (!tokenObject) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, errorMessage.WRONG_TOKEN.message, errorMessage.WRONG_TOKEN.code);
      }

      req.user = tokenObject.user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, errorMessage.NO_TOKEN.message, errorMessage.NO_TOKEN.code);
      }

      await authHelper.verifyToken(token, REFRESH);

      const tokenObject = await OAuth.findOne({ refreshToken: token });

      if (!tokenObject) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, errorMessage.WRONG_TOKEN.message, errorMessage.WRONG_TOKEN.code);
      }

      req.user = tokenObject;
      next();
    } catch (e) {
      next(e);
    }
  }
};
