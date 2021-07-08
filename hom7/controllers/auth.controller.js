const { statusCode, successfulMessage } = require('../constants');
const { OAuth } = require('../database');
const { authHelper } = require('../helpers');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id } = req.user;

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.create({ ...tokenPair, user: _id });

      res.status(statusCode.UPDATED).json({ ...tokenPair, user: req.user });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { accessToken } = req.user;

      await OAuth.remove({ accessToken });

      res.status(statusCode.DELETED).json(successfulMessage.SUCCESSFUL_LOGOUT);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { user: { _id }, refreshToken, user } = req.user;

      const tokenPair = authHelper.generateTokenPair();

      await OAuth.remove({ refreshToken });
      await OAuth.create({ ...tokenPair, user: _id });

      res.status(statusCode.UPDATED).json({ ...tokenPair, user });
    } catch (e) {
      next(e);
    }
  },
};
