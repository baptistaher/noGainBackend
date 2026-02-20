export type CreateEmployeeRequestDTO = {
	name: string;
	email: string;
	phone: string;
	cni: string;
	nif: string;
	birth: Date;
};

export type CreateEmployeeResponseDTO = {
	id: string;
	name: string;
	email: string;
	phone: string;
	cni: string;
	nif: string;
	birth: Date;
};
