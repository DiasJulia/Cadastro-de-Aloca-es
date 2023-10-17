import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_URL_INTERNAL || "postgres",
  port: 5432,
  username: process.env.POSTGRESQL_LOGIN || "postgres",
  password: process.env.POSTGRESQL_PASSWORD || "123456",
  database: process.env.DEFAULT_DATABASE_NAME || "database",
  synchronize: true,
  logging: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
});
