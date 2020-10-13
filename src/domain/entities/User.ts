import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export default class User {
	@Column()
	public name: string;

	@PrimaryColumn()
	public email: string;

	public constructor(name: string, email: string) {
		this.name = name;
		this.email = email;
	}
}