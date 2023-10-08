const { createError } = require("../../helpers");
const { auth: services } = require("../../services");

const refreshTokens = async (req, res, next) => {
  try {
    if (String(req.user.sid) !== String(req.body.sid)) {
      throw createError(400);
    }
    const data = await services.refreshTokens(req.user);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = refreshTokens;
