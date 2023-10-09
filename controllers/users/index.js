const getCurrentUser = require("./getCurrentUser");
const updateUserInfo = require("./updateUserInfo");
const updateUserAvatar = require("./updateUserAvatar");
const { removeUserAvatar } = require("./removeUserAvatar");

module.exports = {
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
  removeUserAvatar,
};
