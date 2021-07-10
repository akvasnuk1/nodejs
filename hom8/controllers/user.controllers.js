const {
  statusCode,
  successfulMessage,
  directoryName: {
    USERS,
    PHOTOS,
    DOCS,
    VIDEOS
  },
  constants: { AUTHORIZATION },
  emailActionsEnum: {
    WELCOME,
    UPDATE_USER,
    DELETE_USER,
    VERIFY_ACCOUNT
  },
  emailActionImage: {
    REGISTER_IMAGE,
    UPDATE_IMAGE,
    DELETE_IMAGE
  }
} = require('../constants');
const { userService, mailService } = require('../services');
const { passwordHelper, userHelper } = require('../helpers');
const { OAuth, User } = require('../database');
const { fileHelper } = require('../helpers');

module.exports = {
  allUser: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers().lean();

      const normalizedUser = userHelper.userNormalizator(users);

      res.json(normalizedUser);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user } = req;
      const token = req.get(AUTHORIZATION);

      await userService.deleteUser(user);
      await OAuth.remove({ accessToken: token });
      await mailService.sendMail(user.email, DELETE_USER, { userName: user.name, img: DELETE_IMAGE });

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  getUser: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const {
        avatar,
        body: { email, name, password }
      } = req;

      const hashedPassword = await passwordHelper.hash(password);

      const createdUser = await userService.insertUser({ ...req.body, password: hashedPassword });

      await mailService.sendMail(email, WELCOME, { userName: name, img: REGISTER_IMAGE });
      await mailService.sendMail(email, VERIFY_ACCOUNT, { userName: name });

      const userId = createdUser._id.toString();
      const { _id } = createdUser;

      if (avatar) {
        const { finalPath, pathForDB } = await fileHelper._filesDirBuilder(avatar.name, userId, PHOTOS, USERS);
        await avatar.mv(finalPath);
        await User.updateOne({ _id }, { avatar: pathForDB });
      }

      res.status(statusCode.CREATED).json(successfulMessage.REGISTER_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user } = req;

      await userService.updateUser(user, req.body);
      await mailService.sendMail(user.email, UPDATE_USER, { userName: user.name, img: UPDATE_IMAGE });

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  addPhoto: async (req, res, next) => {
    try {
      const { photos, user: { _id } } = req;

      const pathArray = await fileHelper._filesSaver(photos, _id.toString(), PHOTOS, USERS);

      User.updateOne({ _id }, pathArray);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
