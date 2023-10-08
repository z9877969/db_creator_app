const { Schema, model } = require("mongoose");
const {
  userSchema: constants,
  transactionSchema,
  regex,
} = require("../../constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: constants.USER_NAME_LENGTH.MIN,
      maxLength: constants.USER_NAME_LENGTH.MAX,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: regex.EMAIL_REGEX,
      maxLength: constants.EMAIL_LENGTH.MAX,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: constants.PASSWORD_LENGTH.MIN,
      maxLength: constants.PASSWORD_LENGTH.MAX,
    },
    avatarUrl: {
      type: String,
      require: true,
      default: null,
    },
    currency: {
      type: String,
      default: transactionSchema.TRANSACTIONS_CURRENCY.UAH,
      enum: Object.values(transactionSchema.TRANSACTIONS_CURRENCY),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = {
  User,
};
