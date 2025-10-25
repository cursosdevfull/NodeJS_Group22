import { IBootstrap } from "./bootstrap";
import { DataSource } from 'typeorm';
import { env } from "@core"
import path from "node:path"

export class Database implements IBootstrap<DataSource> {
    static dataSource: DataSource

    async initialize(): Promise<DataSource> {
        const ds = new DataSource({
            type: "mysql",
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
            entities: [path.join(__dirname, "../modules/**/*.entity.{ts,js}")],
            synchronize: env.DB_SYNC === "true" ? true : false,
            logging: env.DB_LOGG === "true" ? true : false,
            poolSize: env.DB_POOL_SIZE,
            maxQueryExecutionTime: env.DB_MAX_QUERY_EXECUTION_TIME,
        })

        Database.dataSource = ds;

        return ds.initialize();
    }
}