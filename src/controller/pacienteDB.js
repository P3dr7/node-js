import { randomUUID }from 'node:crypto';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let hosp;
		if (search) {
			const sql = 'SELECT * FROM paciente WHERE Nome_Paciente LIKE ?';
			pac = connection.query(sql, [`%${search}%`]);
            pac = pac[0];
		} else {
			[pac] = await connection.query('SELECT * FROM hospital');
		}
	
		return hosp;
	}

	async create(infos) {
		// Limpa o UUID deixando apenas numeros
		const PacienteUUID = randomUUID().replace(/\D/g, '');
        let strNumber = String(PacienteUUID);
        if (strNumber.length > 18) {
            strNumber = strNumber.substring(0, 18);
        }
        let PacienteUUIDtrated = parseInt(strNumber, 10);
		// Puxa os dados passado pelo post
		const {name, adress, alergia,hospProximo} = infos;
		// insere no banco de dados
        const sql = 'INSERT INTO paciente (ID_Paciete, Nome_Paciente, Endereco_paciente, Alergia_Remedio, Hospital_Proximo) VALUES (?, ?, ?, ?,?)';
        const values = [PacienteUUIDtrated, name, adress, alergia,hospProximo];
		//console.log(hospitalID);
		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
