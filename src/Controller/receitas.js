import { DatabaseSQL } from "../DB/receitas.js";
import { connection } from "../DB/db.js";
const database = new DatabaseSQL();

async function checkMedicoExists(nameDoc) {
	
	const resultDoc = await connection.query(
		"SELECT ID_Medico FROM medicos WHERE Nome_Medico = ?",
		[nameDoc]
	);
    

	// Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
	if (resultDoc && resultDoc.length > 0 && resultDoc[0].length > 0) {
		const idDoctor = resultDoc[0][0].ID_Medico;
		
		console.log(idDoctor)
        return idDoctor;
	}
	return null;
}
async function checkPacienteExists(namePac) {
	// Consulta para verificar a existência do Paciente pelo nome
	
	const resultPac = await connection.query(
		"SELECT ID_Paciente FROM paciente WHERE Nome_Paciente = ?",
		[namePac]
	);
	// console.log('Resultado da consulta:', result);
	// Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
	
		if (resultPac && resultPac.length > 0 && resultPac[0].length > 0) {
            const idPac = resultPac[0][0].ID_Paciente;
            return idPac;
        }
	return null;
}
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
