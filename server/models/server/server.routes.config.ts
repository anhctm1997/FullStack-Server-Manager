import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import jwtMiddlewares from "../../auth/middlewares/jwt.middlewares";
import serversController from "./controllers/servers.controller";
import serversMiddleware from "./middleware/servers.middleware";
export class ServerRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ServerRoutes");
  }
  configureRoutes(): express.Application {
    this.app
      .route(`/servers`)
      .get(jwtMiddlewares.validJWTNeeded, serversController.listServers)
      .post(
        jwtMiddlewares.validJWTNeeded,
        serversMiddleware.validReqServerBodyFields,
        serversMiddleware.validSameServerDoesntExist,
        serversController.createServer
      );
    this.app
      .route(`/search/servers`)
      .get(jwtMiddlewares.validJWTNeeded, serversController.findListServers);

    this.app
      .param(`serverId`, serversMiddleware.extractServerId)
      .route(`/servers/:serverId`)
      .all(
        jwtMiddlewares.validJWTNeeded,
        serversMiddleware.validateServerExists
      )
      .get(jwtMiddlewares.validJWTNeeded, serversController.getServerById)
      .delete(jwtMiddlewares.validJWTNeeded, serversController.removeServer);

    this.app.put(`/servers/:serverId`, [
      jwtMiddlewares.validJWTNeeded,
      serversMiddleware.validReqServerBodyFields,
      serversMiddleware.validSameHostBelongToSameServerID,
      serversController.put,
    ]);

    return this.app;
  }
}
