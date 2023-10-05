import { DataSource } from "typeorm";

import { TestDataSource } from "../src/test-data-source";

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  async setupTestDB() {
    try {
      this.dbConnect = TestDataSource;
      await this.dbConnect.initialize();
      console.log(`In memory Db initialized`);
    } catch (err) {
      console.error(
        `dbConnectionManager - error initializing db. Error: ${err.message}`
      );
    }
  }

  teardownTestDB() {
    this.dbConnect.destroy();
  }
}
