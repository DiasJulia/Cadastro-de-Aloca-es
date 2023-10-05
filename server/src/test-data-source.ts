import "reflect-metadata";
import { DataSource } from "typeorm";

export const TestDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:",
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: ["src/models/*.ts"],
});
