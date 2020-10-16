import {Application} from "express";
import {ILogger} from "./infra/logging/Logger";
import "reflect-metadata"; // Necesario para routing-controllers
import {createExpressServer, getMetadataArgsStorage, useContainer} from "routing-controllers";
import {routingControllersToSpec} from 'routing-controllers-openapi';
import {validationMetadatasToSchemas} from 'class-validator-jsonschema'
import swaggerUi from 'swagger-ui-express';
import ContainerAdapter from "./infra/container/ContainerAdapter";
import {IContainer} from "./infra/container/Container";

export interface ApiConstructor {
    port: number,
    logger: ILogger,
    container: IContainer
}

export default class Api {
    private readonly port: number;
    private readonly logger: ILogger;
    private readonly container: IContainer;

    public constructor({port, logger, container}: ApiConstructor) {
        this.port = port;
        this.logger = logger;
        this.container = container;
    }

    public async start(): Promise<void> {
        await this.useContainer();
        const app: Application = createExpressServer(this.options());
        this.serveApiDocs(app)
        app.listen(this.port, () => this.logger.info(`Listening at port ${this.port}`))
    }

    /**
     * Configura el container para instanciar los controladores.
     * @private
     */
    private async useContainer() {
        useContainer(new ContainerAdapter(this.container));
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
                components: {schemas},
                info: {title: 'Node template', version: '1.0.0'},
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
