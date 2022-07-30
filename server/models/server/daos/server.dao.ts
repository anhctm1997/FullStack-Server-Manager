import mongooseServices from "../../../common/services/mongoose.services";
import shortid from "shortid";
import debug from "debug";
import { CreateServerDto } from "../dto/create.server.dto";
import { PutServerDto } from "../dto/put.server.dto";
import { PatchServerDto } from "../dto/patch.server.dto";
const log: debug.IDebugger = debug("app:servers-dao");
class ServersDao {
  Schema = mongooseServices.getMongoose().Schema;
  serverSchema = new this.Schema({
    _id: { type: String, required: true },
    name: {
      type: String,
      require: true,
    },
    username: { type: String, require: true },

    password: { type: String, require: true },
    host: {
      type: String,
      require: true,
    },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    status: {
      type: Boolean,
      default: true,
    },
    cpu: {
      type: String,
      require: true,
    },
    ram: {
      type: Number,
      require: true,
      default: 1,
    },
    http: {
      type: Boolean,
      default: true,
    },
    https: {
      type: Boolean,
      default: true,
    },
  });
  Server = mongooseServices.getMongoose().model("Servers", this.serverSchema);
  constructor() {}
  async addServer(serverFields: CreateServerDto) {
    const serverId = shortid.generate();
    const server = new this.Server({
      _id: serverId,
      ...serverFields,
    });
    await server.save();
    return server;
  }
  async getServerByServerName(name: string) {
    return this.Server.findOne({ name: name }).exec();
  }
  async getServerByServerHost(host: string) {
    return this.Server.findOne({ host: host }).exec();
  }
  async getServerByIdWithPassword(serverid: string) {
    return this.Server.findOne({ _id: serverid })
      .select("_id name host +auth")
      .exec();
  }
  async removeServerById(serverId: string) {
    try {
      await this.Server.deleteOne({ _id: serverId }).exec();
      return serverId;
    } catch (error) {
      return error;
    }
  }
  async getServerById(serverId: string) {
    return this.Server.findOne({ _id: serverId }).select("-auth").exec();
  }
  async getServers(limit = 25, page = 0) {
    const totalServer = (await this.Server.find()).length;
    const totalPage = totalServer / limit;
    const skip = limit * (page - 1) < 0 ? 0 : limit * (page - 1);
    return {
      meta: {
        totalCount: totalServer,
        totalPage: Math.ceil(totalPage),
      },
      data: await this.Server.find()
        .select("-auth")
        .limit(limit)
        .skip(skip)
        .exec(),
    };
  }
  async findServers(params, limit = 10, page = 0) {
    const skip = limit * (page - 1) < 0 ? 0 : limit * (page - 1);
    const listServer = await this.Server.find({
      name: { $regex: params, $options: "i" },
    })
      .select("-password")
      .limit(limit)
      .exec();
    const totalServer = listServer.length;
    const totalPage = totalServer / limit;
    return {
      meta: {
        totalCount: totalServer,
        totalPage: Math.ceil(totalPage),
      },
      data: listServer,
    };
  }
  async updateServerById(
    serverId: string,
    serverFields: PatchServerDto | PutServerDto
  ) {
    const existingServer = await this.Server.findOneAndUpdate(
      { _id: serverId },
      { $set: serverFields },
      { new: true }
    ).exec();
    return existingServer;
  }
}
export default new ServersDao();
