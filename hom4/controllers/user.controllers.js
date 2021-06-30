const { statusCode, successfulMessage } = require('../constants');
const { userService } = require('../services');

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
      const { userId } = req.params;

      await userService.deleteUser(userId);

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.findUserById(userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      await userService.insertUser(req.body);
      res.status(statusCode.CREATED).json(successfulMessage.REGISTER_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await userService.updateUser(userId, req.body);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
