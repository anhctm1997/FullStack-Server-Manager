import express from "express";
import messageStatus from "../../../configs/constant/messageStatus";
import userService from "../services/users.service";
class UsersMiddleware {
  async validReqUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.email
    ) {
      next();
    } else {
      res.status(400).json(messageStatus(400, "Missing required fields"));
    }
  }
  async validReqUpdateBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.username && req.body.name && req.body.email) {
      next();
    } else {
      res.status(400).json(messageStatus(400, "Missing required fields"));
    }
  }

  async validSameUserDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByUsername(req.body.username);
    if (user && req.body.username === user.username) {
      res.status(400).json(messageStatus(400, "Username already exists"));
    } else {
      next();
    }
  }
  async validSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user && req.body.email === user.email) {
      res.status(400).json(messageStatus(400, "Email already exists"));
    } else {
      next();
    }
  }
  async validSameUsernameBelongToSameUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByUsername(req.body.username);
    if (user && user._id === req.params.userId) {
      res.locals.user = user;
      next();
    } else {
      res.status(400).json(messageStatus(400, "Invalid username"));
    }
  }
  async userCantChangePermission(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (res.locals.user.isAdmin !== req.body.isAdmin) {
      res
        .status(403)
        .json(messageStatus(403, "User cannot change permission level"));
    } else {
      next();
    }
  }
  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.readById(req.params.userId);
    if (user) {
      next();
    } else {
      res
        .status(404)
        .json(messageStatus(400, `User ${req.params.userId} not found`));
    }
  }
  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
