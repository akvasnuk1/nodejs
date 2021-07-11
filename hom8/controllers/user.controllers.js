const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const {
  statusCode,
  successfulMessage,
  directoryName: {
    USERS,
    AVATAR,
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
const { OAuth } = require('../database');
const { fileHelper } = require('../helpers');
const { ErrorHandler, errorMessage } = require('../error');

const rmdir = promisify(fs.rmdir);

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

      if (avatar) {
        const { finalPath, pathForDB } = await fileHelper._filesDirBuilder(avatar.name, userId, AVATAR, USERS);
        await avatar.mv(finalPath);
        await userService.updateUser(createdUser, { avatar: pathForDB });
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

  addFilesOrRemove: async (req, res, next) => {
    try {
      const {
        user: { _id },
        params: { files },
        url,
        user
      } = req;

      if (url.includes('delete')) {
        await rmdir(path.join(process.cwd(), 'static', USERS, _id.toString(), files), { recursive: true });

        await userService.updateUser({ _id }, { [files]: [] });

        res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);

        return next();
      }

      const chosenFiles = req[files];

      if (!chosenFiles.length) {
        // eslint-disable-next-line max-len
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.WRONG_FILE_LOAD_PATH.message, errorMessage.WRONG_FILE_LOAD_PATH.code);
      }

      const pathArray = await fileHelper._filesSaver(chosenFiles, _id, files, USERS);

      if (user[files].length) {
        const filesArray = user[files];

        filesArray.push(...pathArray);

        filesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        Object.assign(user, { filesArray });

        await userService.updateUser({ _id }, user);

        res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);

        return next();
      }

      Object.assign(user, { [files]: pathArray });

      await userService.updateUser({ _id }, user);

      res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateOrDeleteAvatar: async (req, res, next) => {
    try {
      const { avatar, user: { _id } } = req;

      const userId = _id.toString();

      await rmdir(path.join(process.cwd(), 'static', USERS, userId, 'avatar'), { recursive: true });

      await userService.updateUser({ _id }, { avatar: undefined });

      if (avatar) {
        const { finalPath, pathForDB } = await fileHelper._filesDirBuilder(avatar.name, userId, AVATAR, USERS);

        await avatar.mv(finalPath);
        await userService.updateUser({ _id }, { avatar: pathForDB });

        res.status(statusCode.UPDATED).json(successfulMessage.UPDATED_MESSAGE);

        return next();
      }

      res.status(statusCode.DELETED).json(successfulMessage.DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
