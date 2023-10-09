const { createError } = require("../../helpers");
const { users: services } = require("../../services");

const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, "File must be required");
    }

    const updatedAvatarUrl = await services.updateUserAvatar(
      req.user,
      req.file
    );

    res.json(updatedAvatarUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserAvatar;
