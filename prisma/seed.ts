import { PrismaClient, Roles } from "@prisma/client";
import { hash } from "bcryptjs";
import { employees } from "./data/employee";
import { manager } from "./data/manager";

const prisma = new PrismaClient();

async function runSeed() {
	// Employee

	const existe = await prisma.user.count();

	if (existe === 0) {
		const hashedPassword = await hash("123456", 12);
		await Promise.all(
			employees.map(async (employee) => {
				await prisma.user.create({
					data: {
						name: employee.name,
						email: employee.email,
						phone: employee.phone,
						password: hashedPassword,
						role: Roles.EMPLOYEE,
						cni: employee.cni,
						nif: employee.nif,
						birth: employee.birth_date,
						employee: {
							create: {},
						},
					},
				});
			}),
		);

		// manager
		await prisma.user.create({
			data: {
				name: manager.name,
				email: manager.email,
				phone: manager.phone,
				password: hashedPassword,
				birth: manager.birth,
				role: Roles.MANAGER,
				cni: manager.cni,
				nif: manager.nif,
				manager: {
					create: {},
				},
			},
		});
	}
}

runSeed()
	.catch((e) => {
		console.error(`There was an error while seeding: ${e}`);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seeded database.Closing connection.");
		await prisma.$disconnect();
	});
