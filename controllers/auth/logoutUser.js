const {auth: services} = require('../../services')

const logoutUser = async (req, res, next) => {
  try {
    await services.logoutUser(req.user.sid);
    res.json().status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
