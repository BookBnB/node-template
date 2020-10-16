import IUserRepository from "./repositories/UserRepository";
import User from "./entities/User";

interface UseCase {
    execute(...params: any): any;
}

export class GetUsers implements UseCase {
    constructor(private readonly users: IUserRepository) {
    }

    execute(): Promise<User[]> {
        return this.users.getAll()
    }
}
