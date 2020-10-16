import Api from "./Api";
import { configure } from "log4js";
import Log4JSLogger from "./infra/logging/Logger";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';


dotenvExpand(dotenv.config())
const DEFAULT_PORT: number = 3333;

async function main() {
	configure(require('../config/log-config.json'));
	const port: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : DEFAULT_PORT;

	const api: Api = new Api(port, new Log4JSLogger('Api'));

	await api.start();
}

main();
