import { DataSource } from "typeorm";

import { AppDataSource } from "../src/data-source";

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  async setupTestDB() {
    this.dbConnect = AppDataSource;
    await this.dbConnect.initialize();
  }

  teardownTestDB() {
    this.dbConnect.destroy();
  }
}
