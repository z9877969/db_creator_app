const { createError } = require("../../helpers/error");
const { userValidationSchemas: schemas } = require("../../models");

const validateUserRegister = async (req, res, next) => {
  try {
    const { error } = await schemas.registerUser.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserLogin = async (req, res, next) => {
  try {
    const { error } = await schemas.loginUser.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateTokensRefreshing = async (req, res, next) => {
  try {
    const { error } = await schemas.refreshTokens.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser: validateUserLogin,
  registerUser: validateUserRegister,
  refreshTokens: validateTokensRefreshing,
};
