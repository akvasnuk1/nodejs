const { userService } = require('../services/index');
const { statusCode } = require('../constants/index');

module.exports = {
  isUserExists: async (req, res, next) => {
    const { userId } = req.params;
    const user = await userService.findUserById(userId);

    if (!user) {
      res.status(statusCode.BAD_REQUEST).json('user not exist');
      throw new Error('user doesnt exist');
    }
    req.user = user;

    next();
  },
  isUserRegister: async (req, res, next) => {
    const { email } = req.body;
    const users = await userService.getAllUsers();

    const userByEmail = users.find((userData) => userData.email === email);

    if (userByEmail) {
      res.status(statusCode.BAD_REQUEST).json('You are registered');
      throw new Error('You are registered');
    }

    next();
  }
};
