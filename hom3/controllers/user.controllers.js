const { userService } = require('../services');
const { statusCode, successfulMessage } = require('../constants');

module.exports = {
  allUser: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await userService.deleteUser(userId);
      res.status(statusCode.DELETED).json(successfulMessage.SUCCESSFUL_DELETED);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  getUser: (req, res) => {
    try {
      res.json(req.user);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  createUser: async (req, res) => {
    try {
      const id = Date.now();
      const users = await userService.getAllUsers();

      const createdUser = { id, ...req.body };
      users.push(createdUser);

      await userService.insertUser(users);
      res.status(statusCode.CREATED).json(successfulMessage.SUCCESSFUL_REGISTER);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;

      await userService.updateUser(userId, req.body);
      res.status(statusCode.UPDATED).json(successfulMessage.SUCCESSFUL_UPDATED);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
