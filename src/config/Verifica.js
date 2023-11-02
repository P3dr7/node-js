import { connection } from "../DB/db.js";
export async function checkMedicoExists(nameDoc) {
	const resultDoc = await connection.query(
		"SELECT ID_Medico FROM medicos WHERE Nome_Medico = ?",
		[nameDoc]
	);
    

	// Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
	if (resultDoc && resultDoc.length > 0 && resultDoc[0].length > 0) {
		const idDoctor = resultDoc[0][0].ID_Medico;

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

	// Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
	
		if (resultPac && resultPac.length > 0 && resultPac[0].length > 0) {
            const idPac = resultPac[0][0].ID_Paciente;
            return idPac;
        }
	return null;
}

export async function checkHospitalExists(nomeHospital) {
    // Consulta para verificar a existência do hospital pelo nome
    const result = await connection.query(
        "SELECT Id_Hospital, Endereco_Hospital FROM hospital WHERE Nome_Hospital = ?",
        [nomeHospital]
    );
    // Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
    if (result && result.length > 0 && result[0].length > 0) {
        const hospitalInfo = {
            id: result[0][0].Id_Hospital,
            endereco: result[0][0].Endereco_Hospital,
        };
        return hospitalInfo;
    }
    return null;
}

export async function checkFarmacialExists(nomeFarmacia) {
    // Consulta para verificar a existência da farmacia pelo nome e obter o endereço
    const result = await connection.query(
        "SELECT ID_Farmacia, Endereco_Farmacia FROM farmacia WHERE Nome_Farmacia = ?",
        [nomeFarmacia]
    );
    // Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
    if (result && result.length > 0 && result[0].length > 0) {
        const farmaciaInfo = {
            id: result[0][0].ID_Farmacia,
            endereco: result[0][0].Endereco_Farmacia,
        };

        return farmaciaInfo;
    }
    return null;
}
export async function checkRemedioExists(namePac) {
	// Consulta para verificar a existência do Paciente pelo nome
	
	const resultRem = await connection.query(
		"SELECT Id_Remedio FROM remedios WHERE Nome_Remedio = ?",
		[namePac]
	);

	// Verifica se o array tem pelo menos 1 elemento, depois verifica se o primeiro elemento tem pelo menos 1 elementro dentro dele
	
		if (resultRem && resultRem.length > 0 && resultRem[0].length > 0) {
            const idRem = resultRem[0][0].Id_Remedio;
            return idRem;
        }
	return null;
}

export async function checkRemedioRepeat(infos) {
    const { nameRem, farmaciaId } = infos;


    const existingRemedio = await connection.query(
        "SELECT * FROM remedios WHERE Nome_Remedio = ? AND fk_Farmacia_Id_Farmacia = ?",
        [nameRem, farmaciaId]
    );
 

    if (existingRemedio[0] && existingRemedio[0].length > 0) {
        return false;
    }

    return true;
}

export async function checkEnderecoFH() {
    try {
      const [existFarmInHosp] = await connection.query(
        "SELECT farmacia.Id_Farmacia, hospital.Id_Hospital FROM farmacia JOIN hospital ON farmacia.Endereco_Farmacia = hospital.Endereco_Hospital;"
      );
      console.log(existFarmInHosp);
      if (existFarmInHosp && existFarmInHosp.length > 0) {
        return existFarmInHosp;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  export async function existeNaTabelaTem(idFarmacia, idHospital) {
    const resultado = await connection.query(
        "SELECT * FROM tem WHERE fk_Farmacia_Id_Farmacia = ? AND fk_Hospital_Id_Hospital = ?",
        [idFarmacia, idHospital]
    );
    return resultado && resultado.length > 0;
}
