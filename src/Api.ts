import { Application} from "express";
import { ILogger } from "./infra/logging/Logger";
import "reflect-metadata"; // Necesario para routing-controllers
import { createExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import swaggerUi from 'swagger-ui-express';
import IUserRepository from "./domain/repositories/UserRepository";


export default class Api {
	private readonly port: number;
	private logger: ILogger;

	public constructor(port: number, userRepo: IUserRepository, logger: ILogger) {
		this.port = port;
		this.logger = logger;
	}

	public async start(): Promise<void> {
		const app: Application = createExpressServer(this.options());
		this.serveApiDocs(app)
		app.listen(this.port, () => this.logger.info(`Listening at port ${this.port}`))
	}

	/**
	 * Muestra la documentación de la api.
	 * @param app
	 * @private
	 */
	private serveApiDocs(app: Application) {
		const schemas = validationMetadatasToSchemas({
			refPointerPrefix: '#/components/schemas/',
		})

		const spec = routingControllersToSpec(
			getMetadataArgsStorage(),
			this.options(),
			{
				components: { schemas },
				info: { title: 'Node template', version: '1.0.0' },
			}
		)

		app.use(`${this.options().routePrefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(spec));
		app.get(`${this.options().routePrefix}/api.json`, (req, res) =>
			res.json(spec));
	}

	/**
	 * Opciones para routing-controllers.
	 * @private
	 */
	private options() {
		return {
			routePrefix: "/v1",
			controllers: [__dirname + "/application/**/*.ts"]
		}
	}
}
