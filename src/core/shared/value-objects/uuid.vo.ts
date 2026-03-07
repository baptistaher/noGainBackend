import { validate as uuidValidate, v7 as uuidv7 } from "uuid";

import { ValueObject } from "../value-object";
export class Uuid extends ValueObject {
	readonly id: string;
	constructor(id?: string) {
		super();
		this.id = id || uuidv7();
		this.validate();
	}

	protected validate() {
		const isValid = uuidValidate(this.id);
		if (!isValid) {
			throw new InvalidUuidError();
		}
	}

	toString() {
		return this.id;
	}
}

export class InvalidUuidError extends Error {
	constructor(message?: string) {
		super(message || "ID must be a valid UUID");
		this.name = "InvalidUuidError";
	}
}
