import express from "express";
import usersService from "../services/users.service";
import argon2 from "argon2";
import debug from "debug";
import { PatchUserDto } from "../dto/patch.user.dto";
import messageStatus from "../../../configs/constant/messageStatus";
const log: debug.IDebugger = debug("app:users-controller");

interface findQuery {
  name: string;
  username: string;
  isAdmin: number;
  email: string;
}
class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const listUsers = await usersService.list(req.query.limit, req.query.page);
    res.status(200).json(listUsers);
  }
  async findUser(
    req: express.Request<{}, {}, {}, findQuery>,
    res: express.Response
  ) {
    if (!req.query.name)
      res.status(404).json(messageStatus(404, "Bad request"));
    const listUsers = await usersService.find(req.query.username, 10, 0);
    res.status(200).json(listUsers);
  }
  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.params.userId);
    res.status(200).json(user);
  }
  async createUser(req: express.Request, res: express.Response) {
    console.log(req.body);
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(201).json(userId);
  }
  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.patchById(req.params.userId, req.body));
    res.status(204).json(messageStatus(200));
  }
  async put(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.putById(req.params.userId, req.body));
    res.status(204).json(messageStatus(200, "success"));
  }
  async removeUser(req: express.Request, res: express.Response) {
    try {
      const id = await usersService.deleteById(req.params.userId);
      res.status(204).json(messageStatus(204, id));
    } catch (error) {
      res.status(400).json(messageStatus(400, "User not found"));
    }
  }
  async updatePermissions(req: express.Request, res: express.Response) {
    const patchUserDto: PatchUserDto = {
      isAdmin: parseInt(req.params.isAdmin),
    };
    log(await usersService.patchById(req.params.userId, patchUserDto));
    res.status(204).json(messageStatus(200));
  }
}

export default new UsersController();
