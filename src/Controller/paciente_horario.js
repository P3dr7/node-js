import { DatabaseSQL } from "../DB/paciente_horario.js";

import { checkPacienteExists } from "../config/Verifica.js";
const database = new DatabaseSQL();

export const createHPac = async (request, reply) => {
	const { nomePac, AtendimentoPac, EntradaPac, SaidaPac} = request.body;

	// Verifica a existência do hospital e obtém o ID correspondente
	const PacId = await checkPacienteExists(nomePac);
    // console.log(PacId)
	if (!PacId) {
		return reply.status(400).send({ error: "Paciente não encontrado!" });
        
	}

	await database.create({
		nomePac,
		AtendimentoPac,
        EntradaPac,
        SaidaPac,
		fkIdPac: PacId,
	});

	return reply.status(201).send();
};
export const listHPac = async (request, reply) => {
	const search = request.query.search;

	const GETPac = await database.list(search);

	return GETPac;
};

export const deleteHPac = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
