const { userService } = require('../services/index');
const { statusCode } = require('../constants/index');

module.exports = {
  allUser: async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    await userService.deleteUser(userId);
    res.status(statusCode.DELETED);
  },
  getUser: (req, res) => {
    res.json(req.user);
  },
  createUser: async (req, res) => {
    const users = await userService.getAllUsers();
    users.push(req.body);

    await userService.insertUser(users);
    res.status(statusCode.CREATED).json('You successful register');
  },
  updateUser: async (req, res) => {
    await userService.updateUser(req.params, req.body);
    res.status(statusCode.UPDATED).json('successful updated');
  }

};
