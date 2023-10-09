const cloudinary = require("cloudinary");
const { AVATAR_DIR_NAME } = require("../../envConfigs");
const { User } = require("../../models");

module.exports.removeUserAvatar = async (avatarId, userId) => {
  try {
    const { result } = await cloudinary.uploader.destroy(
      `${AVATAR_DIR_NAME}/${avatarId}`
    );

    if (result !== "ok") {
      throw createError(404, "Image not found");
    }

    await User.findByIdAndUpdate(userId, { avatarUrl: null });

    return null;
  } catch (error) {
    throw error;
  }
};
