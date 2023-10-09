const { createError, separatesCategoriesByType } = require("../../helpers");
const { User, Category } = require("../../models");

const getCurrentUser = async (user) => {
  try {
    const userData = await User.findById(
      user._id,
      "-createdAt -password -updatedAt"
    );
    const userCategories = await Category.find({ owner: user._id });

    const categories = separatesCategoriesByType(userCategories);

    userData.categories = categories;
    

    return userData;
  } catch (error) {
    throw error;
  }
};

module.exports = getCurrentUser;
