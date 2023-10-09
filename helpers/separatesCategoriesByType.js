const { TRANSACTION_TYPE } = require("../constants/transactionSchema");

const separatesCategoriesByType = (categories) =>
  !categories.length
    ? {
        [TRANSACTION_TYPE.INCOMES]: [],
        [TRANSACTION_TYPE.EXPENCES]: [],
      }
    : allCategories.reduce((acc, { type, ...category }) => {
        if (!acc[type]) {
          acc[type] = [category];
        } else {
          acc[type].push(category);
        }
        return acc;
      }, {});

module.exports = separatesCategoriesByType;
