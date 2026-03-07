import { validate as validUUid } from "uuid";

import { InvalidUuidError, Uuid } from "./uuid.vo";

describe("UUID -  Unit Test", () => {
	const validateSpy = jest.spyOn(Uuid.prototype as unknown as { validate: () => void }, "validate");

	it("should throw an error when uuid is invalid", () => {
		expect(() => {
			new Uuid("invalid-uuid");
		}).toThrow(new InvalidUuidError());
		expect(validateSpy).toHaveBeenCalled();
		expect(validateSpy).toHaveBeenCalledTimes(1);
	});

	it("should create a valid uuid", () => {
		const uuid = new Uuid();
		expect(uuid.id).toBeDefined();
		expect(validUUid(uuid.id)).toBeTruthy();
		expect(validateSpy).toHaveBeenCalledTimes(1);
	});

	it("should accept a valid uuid", () => {
		const uuid = new Uuid("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d");
		expect(uuid.id).toBeDefined();
		expect(validUUid(uuid.id)).toBeTruthy();
		expect(validateSpy).toHaveBeenCalledTimes(1);
	});
});
