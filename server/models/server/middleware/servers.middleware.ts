import express from "express";
import messageStatus from "../../../configs/constant/messageStatus";
import serverService from "../services/servers.service";
class ServersMiddleware {
  async validReqServerBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(req.body);

    if (req.body && req.body.name && req.body.host && req.body.username) {
      next();
    } else {
      res
        .status(400)
        .json(messageStatus(400, "Missing required fields: Server infomation"));
    }
  }
  async validSameServerDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const server = await serverService.getServerByName(req.body.name);
    if (server) {
      res.status(400).json(messageStatus(400, "Server name already exists"));
    } else {
      next();
    }
  }
  async validSameHostBelongToSameServerID(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const server = await serverService.getServerByHost(req.body.host);
    if (server && server.id === req.params.serverId) {
      res.locals.server = server;
      next();
    } else {
      res.status(400).json(messageStatus(400, "Invalid Server Host"));
    }
  }
  async userCantChangePermission(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (res.locals.user.permissions !== req.body.permissions) {
      res
        .status(403)
        .json(messageStatus(403, "User cannot change permission level"));
    } else {
      next();
    }
  }
  async validateServerExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const server = await serverService.readById(req.params.serverId);
    if (server) {
      next();
    } else {
      res
        .status(404)
        .json(messageStatus(400, `Server ${req.params.userId} not found`));
    }
  }
  async extractServerId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.serverId;
    next();
  }
}

export default new ServersMiddleware();
