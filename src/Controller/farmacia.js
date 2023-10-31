import { DatabaseSQL } from "../DB/farmacia.js";

const database = new DatabaseSQL();

export const createPharmacy = async (request, reply) => {
	const { name, adress } = request.body;
	await database.create({
		name,
		adress,
	});
	return reply.status(201).send();
};

export const listPharmacy = async (request) => {
	const search = request.query.search;
	const Pharmacy = await database.list(search);
	return Pharmacy;
};

export const deletePharmacy = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};