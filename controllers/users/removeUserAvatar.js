const { users: services } = require("../../services");

module.exports.removeUserAvatar = async (req, res, next) => {
  try {
    const {
      user,
      params: { avatarId },
    } = req;
    await services.removeUserAvatar(avatarId, user._id);
    res.json().status(204);
  } catch (error) {
    next(error);
  }
};
