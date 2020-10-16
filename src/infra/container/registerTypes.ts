import {DIContainer} from "@wessberg/di";
import typeOrmConnection from "../typeOrmConnection";
import {Connection, Repository} from "typeorm";
import {UserController} from "../../application/UserController";
import IUserRepository from "../../domain/repositories/UserRepository";
import UserRepository from "../repositories/UserRepository";
import User from "../../domain/entities/User";
import {IContainer} from "./Container";
import {GetUsers} from "../../domain/UseCases";

/**
 * Registra las relaciones entre las abstracciones y las clases
 * concretas.
 * Es obligatorio recibir un DIContainer porque los tipos se resuelven
 * en tiempo de compilación. Si recibimos un IContainer no se compila
 * correctamente. Esto es necesario para cualquier sentencia que
 * registre cualquier relación.
 * @param container
 */
export default async (container: DIContainer): Promise<IContainer> => {
    const connection = await typeOrmConnection()
    container.registerSingleton<Connection>(() => connection)

    // Users
    await registerUsers(container);

    // Return
    return container
}

const registerUsers = async (container: DIContainer) => {
    const user_repo = await container.get<Connection>().getRepository(User);
    container.registerSingleton<Repository<User>>(() => user_repo)
    container.registerSingleton<IUserRepository>( () =>
        new UserRepository(container.get<Repository<User>>()))
    container.registerSingleton<UserController>()
    container.registerTransient<GetUsers>()
}
