import { Connection, createConnection } from "typeorm";
import Api from "./Api";
import User from "./entities/User";
import UserRepository, { IUserRepository } from "./repositories/UserRepository";
import { configure } from "log4js";
import Log4JSLogger from "./logging/Logger";

const DEFAULT_PORT: number = 3333;

async function main() {
	configure(require('../config/log-config.json'));

	const connection: Connection = await createConnection({
		type: "postgres",
		url: "postgres://mpicco:mpicco@localhost:5432/userdb",
		synchronize: true,
		entities: [ 
			`${__dirname}/entities/*`
		]
	});

	const repo: IUserRepository = new UserRepository(await connection.getRepository(User));

	const port: number = process.env.API_PORT ? parseInt(process.env.API_PORT) : DEFAULT_PORT;

	const api: Api = new Api(port, repo, new Log4JSLogger('Api'));

	api.start();
}

main();
