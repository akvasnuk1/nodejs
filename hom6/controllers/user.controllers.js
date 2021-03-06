const { statusCode, successfulMessage, constants: { AUTHORIZATION } } = require('../constants');
const { userService } = require('../services');
const { passwordHelper } = require('../helpers');
const { OAuth } = require('../database');

module.exports = {
  allUser: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user } = req;
      const token = req.get(AUTHORIZATION);

      await userService.deleteUser(user);
      await OAuth.remove({ accessToken: token });

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  getUser: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const password = await passwordHelper.hash(req.body.password);

      await userService.insertUser({ ...req.body, password });
      res.status(statusCode.CREATED).json(successfulMessage.REGISTER_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user } = req;
      await userService.updateUser(user, req.body);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
