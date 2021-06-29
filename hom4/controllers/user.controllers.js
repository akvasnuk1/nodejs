const { statusCode } = require('../constants/index');
const { User } = require('../database/index');
const { successfulMessage } = require('../constants/index');

module.exports = {
  allUser: async (req, res) => {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (e) {
      res.stat(statusCode.DELETED).json(e.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      await User.findByIdAndDelete(userId);

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      res.json(e.message);
    }
  },

  getUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      res.json(user);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  createUser: async (req, res) => {
    await User.create(req.body);

    res.status(statusCode.CREATED).json(successfulMessage.REGISTER_MESSAGE);
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndUpdate(userId, req.body);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
