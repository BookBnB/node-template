import {Action, ClassConstructor, IocAdapter} from "routing-controllers";
import {DIContainer} from "@wessberg/di";
import {UserController} from "../application/UserController";
import {Connection} from "typeorm";
import IUserRepository from "../domain/repositories/UserRepository";

export default class ContainerAdapter implements IocAdapter {
    private container: DIContainer;

    constructor(connection: Connection, repo: IUserRepository) {
        this.container = new DIContainer();
        this.container.registerSingleton<UserController>()
        this.container.registerSingleton<Connection>( () => connection)
        this.container.registerSingleton<IUserRepository>( () => repo)
        this.container.get<UserController>()
        // this.getA<IUserRepository>()
    }

    get<T>(someClass: ClassConstructor<T>, action?: Action): T {
        return this.container.get({identifier: someClass.name});
    }
}
