const { updateError, tokenTools } = require("../../helpers");
const { Session } = require("../../models");

const refreshTokens = async (user) => {
  try {
    await Session.findByIdAndRemove(user.sid);
    const { _id: sid } = await Session.create({ uid: user._id });
    const { accessToken, refreshToken } = tokenTools.createTokens({
      id: user._id,
      sid,
    });
    return { accessToken, refreshToken, sid };
  } catch (error) {
    throw updateError(400, error);
  }
};

module.exports = refreshTokens;
