import { Repository } from "typeorm";
import User from "../../domain/entities/User";
import IUserRepository from "../../domain/repositories/UserRepository";

export default class UserRepository implements IUserRepository {
	private repo: Repository<User>;
	
	public constructor(repo: Repository<User>) {
		this.repo = repo;
	}

	public getAll(): Promise<User[]> {
		return this.repo.find();
	}

	public findByEmail(email: string): Promise<User | undefined> {
		return this.repo.findOne({ email: email });
	}

	public deleteByEmail(email: string): Promise<void> {
		return this.repo.delete({ email: email }).then(() => Promise.resolve());
	}

	public save(user: User): Promise<User> {
		return this.repo.save(user);
	}
}
