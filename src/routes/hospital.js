import { DatabaseSQL } from "../controller/hospitalDB.js";

const database = new DatabaseSQL();

export const createHospital = async (request, reply) => {
	const { name, adress } = request.body;
	await database.create({
		name,
		adress,
	});
	return reply.status(201).send();
};

export const listHospitals = async (request) => {
	const search = request.query.search;
	const hospitals = await database.list(search);
	return hospitals;
};

export const deleteHospital = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
