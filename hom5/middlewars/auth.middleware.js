const { passwordHelper } = require('../helpers');
const { ErrorHandler, errorMessage } = require('../error');
const { statusCode } = require('../constants');
const { userService } = require('../services');

module.exports = {
  checkIsUserExist: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findUserByEmail(email).select('+password');

      if (!user) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.USER_NOT_EXISTS.message, errorMessage.USER_NOT_EXISTS.code);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsPasswordValid: async (req, res, next) => {
    try {
      const { password } = req.body;

      await passwordHelper.compare(password, req.user.password);

      next();
    } catch (e) {
      next(e);
    }
  }
};
