import { ulid, isValid as ulidIsValid } from "ulid";

import { ValueObject } from "../value-object";
export class ULid extends ValueObject {
	readonly id: string;
	constructor(id?: string) {
		super();
		this.id = id || ulid();
		this.validate();
	}

	protected validate() {
		const isValid = ulidIsValid(this.id);
		if (!isValid) {
			throw new InvalidUlidError();
		}
	}

	toString() {
		return this.id;
	}
}

export class InvalidUlidError extends Error {
	constructor(message?: string) {
		super(message || "ID must be a valid ULID");
		this.name = "InvalidUlidError";
	}
}
