import User from "../entities/User";

export default interface IUserRepository {
	getAll(): Promise<User[]>;
	findByEmail(email: string): Promise<User | undefined>;
	deleteByEmail(email: string): Promise<void>;
	save(user: User): Promise<User>;
}
