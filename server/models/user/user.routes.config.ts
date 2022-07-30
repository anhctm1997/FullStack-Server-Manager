import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import jwtMiddlewares from "../../auth/middlewares/jwt.middlewares";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";
import authMiddlewares from "../../auth/middlewares/auth.middlewares";
export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/users`)
      .all(jwtMiddlewares.validJWTNeeded, authMiddlewares.validateIsAdmin)
      .get(
        jwtMiddlewares.validJWTNeeded,
        authMiddlewares.validateIsAdmin,
        UsersController.listUsers
      )
      .post(
        authMiddlewares.validateIsAdmin,
        UsersMiddleware.validReqUserBodyFields,
        UsersMiddleware.validSameUserDoesntExist,
        UsersMiddleware.validSameEmailDoesntExist,
        UsersController.createUser
      );
    this.app
      .route(`/users/find`)
      .all(jwtMiddlewares.validJWTNeeded, authMiddlewares.validateIsAdmin)
      .get(
        jwtMiddlewares.validJWTNeeded,
        authMiddlewares.validateIsAdmin,
        UsersController.listUsers
      );
    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(
        jwtMiddlewares.validJWTNeeded,
        authMiddlewares.validateIsAdmin,
        UsersMiddleware.validateUserExists
      )
      .get(
        jwtMiddlewares.validJWTNeeded,
        authMiddlewares.validateIsAdmin,
        UsersController.getUserById
      )
      .delete(
        jwtMiddlewares.validJWTNeeded,
        authMiddlewares.validateIsAdmin,
        UsersController.removeUser
      );
    this.app.put(`/users/:userId`, [
      jwtMiddlewares.validJWTNeeded,
      authMiddlewares.validateIsAdmin,
      UsersMiddleware.validReqUpdateBodyFields,
      UsersMiddleware.validSameUsernameBelongToSameUser,
      UsersController.put,
    ]);

    return this.app;
  }
}
