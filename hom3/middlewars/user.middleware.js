const { userService } = require('../services/index');
const { statusCode, errors } = require('../constants/index');

module.exports = {
  isUserExists: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.findUserById(userId);
      console.log(user);
      if (!user) {
        throw new Error(errors.IS_USER_EXIST);
      }
      req.user = user;

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isUserRegister: async (req, res, next) => {
    try {
      const { email } = req.body;
      const users = await userService.getAllUsers();

      const userByEmail = users.find((userData) => userData.email === email);

      if (userByEmail) {
        throw new Error('You are registered');
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isFieldEmpty: (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new Error(errors.IS_FIELD_EMPTY);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isEmailEmpty: (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw new Error(errors.IS_EMAIL_EMPTY);
      }

      next();
    } catch (e) {
      res.search(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
