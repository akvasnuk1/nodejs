const { statusCode } = require('../constants/index');
const { successfulMessage } = require('../constants/index');
const { userService } = require('../services/index');

module.exports = {
  allUser: async (req, res) => {
    try {
      const users = await userService.getAllUsers();

      res.json(users);
    } catch (e) {
      res.stat(statusCode.DELETED).json(e.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      await userService.deleteUser(userId);

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      res.json(e.message);
    }
  },

  getUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await userService.findUserById(userId);

      res.json(user);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  createUser: async (req, res) => {
    await userService.insertUser(req.body);

    res.status(statusCode.CREATED).json(successfulMessage.REGISTER_MESSAGE);
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await userService.updateUser(userId, req.body);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
