const { ErrorHandler, errorMessage } = require('../error');
const { statusCode } = require('../constants');
const { userService } = require('../services');
const { userValidator, urlValidator } = require('../validators');

module.exports = {
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
      const { error } = urlValidator.urlValidator.validate(userId);

      if (error) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.USER_ID_NOT_VALID.code);
      }

      const userById = await userService.findUserById(userId);

      if (!userById) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_NOT_EXISTS.message, errorMessage.USER_NOT_EXISTS.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  isUserDataValid: (req, res, next) => {
    try {
      const { error } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, errorMessage.NOT_VALID_DATA.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
