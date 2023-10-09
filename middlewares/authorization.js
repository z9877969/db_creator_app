const { createError, tokenTools, updateError } = require("../helpers");
const { User, Session } = require("../models");

const accessToken = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createError(400, "No token provided");
    }

    try {
      const { id, sid } = await tokenTools.verifyAccessToken(token);
      if (!id || !sid) {
        throw createError(401);
      }
      const userSession = await Session.findById(sid);
      if (!userSession) {
        throw createError(404, "Invalid session");
      }

      const user = await User.findById(id);

      if (!user) {
        throw createError(404, "Invalid user");
      }

      req.user = user;
      req.user.sid = sid;

      next();
    } catch (error) {
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createError(400, "No token provided");
    }

    try {
      const { id, sid } = await tokenTools.verifyRefreshToken(token);
      if (!id || !sid) {
        throw createError(401);
      }
      const userSession = await Session.findById(sid);
      if (!userSession) {
        throw createError(404, "Invalid session");
      }

      const user = await User.findById(id);

      if (!user) {
        throw createError(404, "Invalid user");
      }

      req.user = user;
      req.user.sid = sid;

      return next();
    } catch (error) {
      throw updateError(404, error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { accessToken, refreshToken };
