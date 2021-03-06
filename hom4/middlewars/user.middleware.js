const { ErrorHandler, errorMessage } = require('../error');
const { statusCode } = require('../constants');
const { userService } = require('../services');

module.exports = {
  isFieldEmpty: (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.FIELD_IS_EMPTY.message, errorMessage.FIELD_IS_EMPTY.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserRegister: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await userService.findUserByEmail(email);

      if (userByEmail) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_IS_REGISTER.message, errorMessage.USER_IS_REGISTER.code);
      }

      next();
    } catch (e) {
      next(e);
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
      next(e);
    }
  }
};
