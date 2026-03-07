import { isValid as ulidIsValid } from "ulid";

import { InvalidUlidError, ULid } from "./ulid.vo";

describe("ULID -  Unit Test", () => {
	const validateSpy = jest.spyOn(ULid.prototype as unknown as { validate: () => void }, "validate");

	it("should throw an error when ulid is invalid", () => {
		expect(() => {
			new ULid("invalid-ulid");
		}).toThrow(new InvalidUlidError());
	});

	it("should create a valid ulid", () => {
		const ulid = new ULid();
		expect(ulid.id).toBeDefined();
		expect(ulidIsValid(ulid.id)).toBeTruthy();
		expect(validateSpy).toHaveBeenCalledTimes(1);
	});

	it("should accept a valid ulid", () => {
		const ulid = new ULid("01FQJN0QJQJQJQJQJQJQJQJQJQ");
		expect(ulid.id).toBeDefined();
		expect(ulidIsValid(ulid.id)).toBeTruthy();
		expect(validateSpy).toHaveBeenCalledTimes(1);
	});
});
