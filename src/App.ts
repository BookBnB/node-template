import {Connection, createConnection, getConnectionOptions} from "typeorm";
import Api from "./Api";
import User from "./entities/User";
import UserRepository, { IUserRepository } from "./repositories/UserRepository";
import { configure } from "log4js";
import Log4JSLogger from "./logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import OrmLogger from "./logging/OrmLogger";

dotenvExpand(dotenv.config())
const DEFAULT_PORT: number = 3333;

async function main() {
	configure(require('../config/log-config.json'));

	const connectionOptions = await getConnectionOptions();
	const connection: Connection = await createConnection({
		...connectionOptions,
		synchronize: true,
		logger: new OrmLogger(new Log4JSLogger('Orm')),
		entities: [ 
			`${__dirname}/entities/*`
		]
	});

	const repo: IUserRepository = new UserRepository(await connection.getRepository(User));

	const port: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : DEFAULT_PORT;

	const api: Api = new Api(port, repo, new Log4JSLogger('Api'));

	await api.start();
}

main();
