const Joi = require("joi");
const mongoose = require("mongoose");
const {
  userSchema: constants,
  regex: { EMAIL_REGEX },
} = require("../../constants");

const userRegisterValidationSchema = Joi.object({
  name: Joi.string()
    .min(constants.USER_NAME_LENGTH.MIN)
    .max(constants.USER_NAME_LENGTH.MAX)
    .required(),
  email: Joi.string()
    .pattern(EMAIL_REGEX)
    .max(constants.EMAIL_LENGTH.MAX)
    .required(),
  password: Joi.string()
    .min(constants.PASSWORD_LENGTH.MIN)
    .max(constants.PASSWORD_LENGTH.MAX)
    .required(),
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .pattern(EMAIL_REGEX)
    .max(constants.EMAIL_LENGTH.MAX)
    .required(),
  password: Joi.string()
    .min(constants.PASSWORD_LENGTH.MIN)
    .max(constants.PASSWORD_LENGTH.MAX)
    .required(),
});

const refreshTokensValidationSchema = Joi.object({
  sid: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.message({
          custom: "Invalid 'sid'. Must be a MongoDB ObjectId",
        });
      }
      return value;
    })
    .required(),
});

const updateUserInfoValidationSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX),
  password: Joi.string()
    .min(constants.PASSWORD_LENGTH.MIN)
    .max(constants.PASSWORD_LENGTH.MAX),
  oldPassword: Joi.string()
    .min(constants.PASSWORD_LENGTH.MIN)
    .max(constants.PASSWORD_LENGTH.MAX),
  name: Joi.string()
    .min(constants.USER_NAME_LENGTH.MIN)
    .max(constants.USER_NAME_LENGTH.MAX),
});

module.exports = {
  registerUser: userRegisterValidationSchema,
  loginUser: userLoginValidationSchema,
  updateUserInfo: updateUserInfoValidationSchema,
  refreshTokens: refreshTokensValidationSchema,
};
