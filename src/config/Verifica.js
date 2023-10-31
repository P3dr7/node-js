import { connection } from "../DB/db.js";
export async function checkMedicoExists(nameDoc) {
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

export async function checkPacienteExists(namePac) {
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

export async function checkHospitalExists(nomeHospital) {
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