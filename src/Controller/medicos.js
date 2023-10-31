import { DatabaseSQL } from "../DB/medicos.js";

const database = new DatabaseSQL();

export const createDoctor = async (request, reply) => {
	const { name, crm, horario } = request.body;
	await database.create({
		name,
		crm,
        horario,
	});
	return reply.status(201).send();
};

export const listDoctor = async (request) => {
	const search = request.query.search;
	const doctor = await database.list(search);
	return doctor;
};

export const deleteDoctor = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
