import { DatabaseSQL } from "../DB/paciente.js";

import { checkHospitalExists } from "../config/Verifica.js"
const database = new DatabaseSQL();

export default async function (fastify) {

	fastify.post("/paciente", async (request, reply) => {
		const { name, adress, alergia, nomeHospital } = request.body;

		// Verifica a existência do hospital e obtém o ID correspondente
		const hospitalinfo = await checkHospitalExists(nomeHospital);
		const hospitalID = hospitalinfo ? hospitalinfo.id : null;
	
		if (!hospitalID) {
			return reply.status(400).send({ error: "Hospital não encontrado!" });
		}

		await database.create({
			name,
			adress,
			alergia,
			hospitalID,
			hospProximo: nomeHospital,
		});

		return reply.status(201).send();
	});

	fastify.get("/paciente", async (request) => {
		const search = request.query.search;

		const GEThospital = await database.list(search);

		return GEThospital;
	});
}
