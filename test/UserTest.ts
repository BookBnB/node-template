import { describe, it } from "mocha";
import User from "../src/domain/entities/User";
import { expect } from "chai";

describe("User", () => {
	it("creates correctly", () => {
		const user: User = new User("user", "email@test.com");

		expect(user.name).to.equal("user");
	});
});
