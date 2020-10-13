import {Connection, createConnection, getConnectionOptions} from "typeorm";
import Api from "./Api";
import User from "./domain/entities/User";
import UserRepository from "./infra/repositories/UserRepository";
import { configure } from "log4js";
import Log4JSLogger from "./infra/logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import OrmLogger from "./infra/logging/OrmLogger";
import IUserRepository from "./domain/repositories/UserRepository";

dotenvExpand(dotenv.config())
const DEFAULT_PORT: number = 3333;

async function main() {
	configure(require('../config/log-config.json'));

	const connectionOptions = await getConnectionOptions();
	const connection: Connection = await createConnection({
		...connectionOptions,
		logger: new OrmLogger(new Log4JSLogger('Orm')),
		entities: [ 
			`${__dirname}/domain/**/entities/*`
		]
	});

	const repo: IUserRepository = new UserRepository(await connection.getRepository(User));

	const port: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : DEFAULT_PORT;

	const api: Api = new Api(port, repo, new Log4JSLogger('Api'));

	await api.start();
}

main();
