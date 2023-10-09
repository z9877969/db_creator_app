const getCurrentUser = require("./getCurrentUser");
const updateUserInfo = require("./updateUserInfo");
const updateUserAvatar = require("./updateUserAvatar");
const { removeUserAvatar } = require("./removeUserAvatar");
const updateWaterRate = require("./updateWaterRate");

module.exports = {
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
  updateWaterRate,
  removeUserAvatar,
};
