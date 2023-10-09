const { createRouter } = require("../../helpers");
const { users: controllers } = require("../../controllers");
const {
  authorization,
  validateUser: validate,
  upload,
} = require("../../middlewares");

const defaultMiddlewares = [authorization.accessToken];
const usersRouterOptions = [
  {
    method: "get",
    route: "/current",
    middlewares: null,
    controller: controllers.getCurrentUser,
  },
  {
    method: "patch",
    route: "/info",
    middlewares: [validate.updateUserInfo],
    controller: controllers.updateUserInfo,
  },
  {
    method: "patch",
    route: "/avatar",
    middlewares: [upload.single("avatar")],
    controller: controllers.updateUserAvatar,
  },
  {
    method: "delete",
    route: "/avatar/:avatarId",
    middlewares: [validate.removeAvatar],
    controller: controllers.removeUserAvatar,
  },
];

const usersRouter = createRouter({
  defaultMiddlewares,
  options: usersRouterOptions,
});
usersRouter.setRouter();

module.exports = usersRouter.router;
