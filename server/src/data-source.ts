import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST_INTERNAL_DEV || "postgres",
  port: 5432,
  username: process.env.POSTGRESQL_LOGIN_DEV || "postgres",
  password: process.env.POSTGRESQL_PASSWORD_DEV || "123456",
  database: process.env.DEFAULT_DATABASE_NAME_DEV || "database",
  synchronize: true,
  logging: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
});
