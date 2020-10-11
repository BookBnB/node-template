import * as bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import User from "./entities/User";
import { ILogger } from "./logging/Logger";
import { IUserRepository } from "./repositories/UserRepository";

export default class Api {
	private port: number;
	private userRepo: IUserRepository;
	private logger: ILogger;

	public constructor(port: number, userRepo: IUserRepository, logger: ILogger) {
		this.port = port;
		this.userRepo = userRepo;
		this.logger = logger;
	}

	public async start(): Promise<void> {
		const app: Application = express();
		app.use(bodyParser.json());

		app.get('/users', async (req: Request, res: Response) => {
			const users = await this.userRepo.getAll();

			this.logger.debug(`List all users`)

			res.status(200);
			res.send(JSON.stringify(users));
		});

		app.get('/users/:email', async (req: Request, res: Response) => {
			const user = await this.userRepo.findByEmail(req.params.email);

			this.logger.debug(`Search user ${req.params.email}`)

			res.status(200);
			res.send(JSON.stringify(user));
		});

		app.delete('/users/:email', async (req: Request, res: Response) => {
			await this.userRepo.deleteByEmail(req.params.email);

			this.logger.debug(`Deleted user ${req.params.email}`)

			res.status(200);
			res.send('ok');
		});

		app.post('/users', async (req: Request, res: Response) => {
			const user: User = new User(req.body.name, req.body.email);
			
			await this.userRepo.save(user);

			this.logger.debug(`Created user ${user.email}`)

			res.status(200);
			res.send('ok');
		});

		app.listen(this.port, () => this.logger.info(`Listening at port ${this.port}`))
	}
}