import { DatabaseSQL } from "../DB/paciente.js";
import { connection } from "../DB/db.js";
const database = new DatabaseSQL();

export default async function (fastify) {
	async function checkHospitalExists(nomeHospital) {
		// Consulta para verificar a existência do hospital pelo nome
		// console.log('Verificando hospital:', nomeHospital);
		const result = await connection.query(
			"SELECT ID_Hospital FROM hospital WHERE Nome_Hospital = ?",
			[nomeHospital]
		);
		// console.log('Resultado da consulta:', result);
		// Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
		if (result && result.length > 0 && result[0].length > 0) {
			const idHospital = result[0][0].ID_Hospital;
			// console.log('ID do Hospital:', idHospital);
			return idHospital;
		}
		return null;
	}

	fastify.post("/paciente", async (request, reply) => {
		const { name, adress, alergia, nomeHospital } = request.body;

		// Verifica a existência do hospital e obtém o ID correspondente
		const hospitalID = await checkHospitalExists(nomeHospital);
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
