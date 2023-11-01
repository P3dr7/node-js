import { DatabaseSQL } from "../DB/remedios.js";

import { checkFarmacialExists } from "../config/Verifica.js";
const database = new DatabaseSQL();

export const createFarm = async (request, reply) => {
	const { name, qntEst, nomeFarmacia } = request.body;

	// Verifica a existência do hospital e obtém o ID correspondente
	const FarmInfo = await checkFarmacialExists(nomeFarmacia);
	const FarmID = FarmInfo ? FarmInfo.id : null;
	if (!FarmID) {
		return reply.status(400).send({ error: "Farmacia não encontrado!" });
	}

	await database.create({
		name,
		qntEst,
		fkFarm: FarmID,
	});

	return reply.status(201).send();
};
export const listFarm = async (request, reply) => {
	const search = request.query.search;

	const GETRem = await database.list(search);

	return GETRem;
};

export const deleteFarm = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
