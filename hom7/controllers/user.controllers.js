const {
  statusCode,
  successfulMessage,
  constants: { AUTHORIZATION },
  emailActionsEnum: { WELCOME, UPDATE_USER, DELETE_USER }
} = require('../constants');
const { userService, mailService } = require('../services');
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
      await mailService.sendMail(user.email, DELETE_USER, { userName: user.name });

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
      const { email, name } = req.body;

      const password = await passwordHelper.hash(req.body.password);

      await userService.insertUser({ ...req.body, password });

      await mailService.sendMail(email, WELCOME, { userName: name });

      res.status(statusCode.CREATED).json(successfulMessage.REGISTER_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user } = req;

      await userService.updateUser(user, req.body);
      await mailService.sendMail(user.email, UPDATE_USER, { userName: user.name });

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
