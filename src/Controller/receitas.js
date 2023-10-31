import { DatabaseSQL } from "../DB/receitas.js";
import { connection } from "../DB/db.js";
import { checkMedicoExists,checkPacienteExists } from "../config/Verifica.js"
const database = new DatabaseSQL();


export const createRec = async (request, reply) => {
    const { name, duracaoFinal, nomeMedico,nomePaciente } = request.body;
	// Verifica as existências
	const DoctorId = await checkMedicoExists(nomeMedico);
    const PacId = await checkPacienteExists(nomePaciente);
	if (!DoctorId) {
		return reply.status(400).send({ error: "Doutor não encontrado!" });
	}
    if (!PacId) {
		return reply.status(400).send({ error: "Paciente não encontrado!" });
	}
	await database.create({
		name,
		finalDate: duracaoFinal,
        ID_Doc: DoctorId,
        medico_resp: nomeMedico,
        pac: nomePaciente,
	});
	return reply.status(201).send();
};


export const listRec = async (request) => {
	const search = request.query.search;
	const rec = await database.list(search);
	return rec;
};

export const deleteRec = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
