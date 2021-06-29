const { statusCode } = require('../constants/index');
const { User } = require('../database/index');
const { errors } = require('../constants/index');

module.exports = {
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

  isUserRegister: async (req, res, next) => {
    try {
      const userByEmail = await User.find({ email: req.body.email });

      if (userByEmail.length > 0) {
        throw new Error(errors.IS_USER_REGISTERED);
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
        throw new Error(errors.IS_USER_ID_VALID);
      }

      const userById = await User.findById(userId);

      if (!userById) {
        throw new Error(errors.IS_USER_EXISTS);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
