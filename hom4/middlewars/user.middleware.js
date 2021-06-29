const { ErrorHandler, errorMessage } = require('../error/index');
const { statusCode } = require('../constants/index');
const { userService } = require('../services/index');

module.exports = {
  isFieldEmpty: (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.FIELD_IS_EMPTY.message, errorMessage.FIELD_IS_EMPTY.code);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isUserRegister: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await userService.findUserByEmail(email);

      if (userByEmail.length > 0) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_IS_REGISTER.message, errorMessage.USER_IS_REGISTER.code);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },

  isUserExists: async (req, res, next) => {
    try {
      const { userId } = req.params;

      if (userId.length > 24 || userId.length < 24) {
        throw new ErrorHandler(400, errorMessage.USER_ID_NOT_VALID.message, errorMessage.USER_ID_NOT_VALID.code);
      }

      const userById = await userService.findUserById(userId);

      if (!userById) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_NOT_EXISTS.message, errorMessage.USER_NOT_EXISTS.code);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
