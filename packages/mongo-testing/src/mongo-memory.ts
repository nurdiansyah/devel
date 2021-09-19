import * as mongodb from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "@deboxsoft/module-core";
import { MONGO_CLIENT_KEY, MONGO_DB_KEY } from "../MongoBase";
import { createSessionManager } from "../SessionManager";

// May require additional time for downloading MongoDB binaries

export class MongoMemory {
  private mongoServer: MongoMemoryServer;
  public db!: mongodb.Db;
  public client!: mongodb.MongoClient;
  options: any;

  constructor(options?: any) {
    this.options = options;
    Container.set(MONGO_DB_KEY, this.db);
  }

  public setup = async () => {
    await this.createConnection();
  };

  public teardown = async () => {
    await this.dropDatabase();
    await this.closeConnection();
  };

  public beforeEach = async () => {
    await this.dropDatabase();
  };

  public createConnection = async () => {
    this.mongoServer = new MongoMemoryServer({});
    const uri = await this.mongoServer.getUri();
    this.client = await mongodb.MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.db = this.client.db("accounting-tests");
    Container.set(MONGO_CLIENT_KEY, this.client);
    Container.set(MONGO_DB_KEY, this.db);
    createSessionManager();
  };

  public closeConnection = async () => {
    await this.client.close();
    await this.mongoServer.stop();
  };

  public dropDatabase = async () => {
    await this.db.dropDatabase();
  };
}
