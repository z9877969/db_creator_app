const { User } = require("../../models");

const updateUserInfo = async (user, body) => {
  try {
    const updatedInfo = await User.findByIdAndUpdate(user._id, body, {
      new: true,
      select: "name currency",
    });
    return updatedInfo;
  } catch (error) {
    throw error;
  }
};

module.exports = updateUserInfo;
