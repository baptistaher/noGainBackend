type EmployeeConstructorProps = {
	employee_id: string;
};

export class Employee {
	private employee_id: string;

	constructor(props: EmployeeConstructorProps) {
		this.employee_id = props.employee_id;
	}

	getEmployeeId() {
		return this.employee_id;
	}
}
