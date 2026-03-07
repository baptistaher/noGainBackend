import { Employee } from "./employee.entity";

describe("Employee - Unit Test", () => {
	describe("constructor", () => {
		it("should create a Employee", () => {
			const employee = new Employee({ employee_id: "123" });
			expect(employee.getEmployeeId()).toBe("123");
		});
	});
});
