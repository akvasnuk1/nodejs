const {
  fileUploadEnum: {
    DOCS_MIMETYPES,
    VIDEOS_MIMETYPES,
    PHOTOS_MIMETYPES,
    PHOTO_MAX_SIZE,
    VIDEO_MAX_SIZE,
    DOCS_MAX_SIZE_
  },
  statusCode
} = require('../constants');
const { ErrorHandler, errorMessage } = require('../error');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      const files = Object.values(req.files);

      const documents = [];
      const videos = [];
      const photos = [];

      for (const file of files) {
        const { name, size, mimetype } = file;

        if (PHOTOS_MIMETYPES.includes(mimetype)) {
          if (size > PHOTO_MAX_SIZE) {
            // eslint-disable-next-line max-len
            throw new ErrorHandler(statusCode.FILE_TOO_BIG, errorMessage.FILE_SIZE_IS_TOO_LARGE.message(name), errorMessage.FILE_SIZE_IS_TOO_LARGE.code);
          }

          photos.push(file);
        } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
          if (size > VIDEO_MAX_SIZE) {
            // eslint-disable-next-line max-len
            throw new ErrorHandler(statusCode.FILE_TOO_BIG, errorMessage.FILE_SIZE_IS_TOO_LARGE.message(name), errorMessage.FILE_SIZE_IS_TOO_LARGE.code);
          }

          videos.push(file);
        } else if (DOCS_MIMETYPES.includes(mimetype)) {
          if (size > DOCS_MAX_SIZE_) {
            // eslint-disable-next-line max-len
            throw new ErrorHandler(statusCode.FILE_TOO_BIG, errorMessage.FILE_SIZE_IS_TOO_LARGE.message(name), errorMessage.FILE_SIZE_IS_TOO_LARGE.code);
          }

          documents.push(file);
        } else {
          // eslint-disable-next-line max-len
          throw new ErrorHandler(statusCode.INVALID_FORMAT, errorMessage.INVALID_FORMAT.message, errorMessage.INVALID_FORMAT.code);
        }
      }

      req.documents = documents;
      req.videos = videos;
      req.photos = photos;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAvatar: (req, res, next) => {
    try {
      if (!req.photos) {
        throw new ErrorHandler(statusCode.INVALID_FORMAT, errorMessage.INVALID_FORMAT.message, errorMessage.INVALID_FORMAT.code);
      }

      if (req.photos.length > 1) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, errorMessage.JUST_ONE_PHOTO.message, errorMessage.JUST_ONE_PHOTO.code);
      }

      [req.avatar] = req.photos;

      next();
    } catch (e) {
      next(e);
    }
  }
};
