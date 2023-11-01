import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let pac;
		if (search) {
			const sql = 'SELECT * FROM paciente WHERE Nome_Paciente LIKE ?';
			pac = connection.query(sql, [`%${search}%`]);
            pac = pac[0];
		} else {
			[pac] = await connection.query('SELECT * FROM paciente');
		}
	
		return pac;
	}

	async create(infos) {
		const PacienteUUIDtrated = GenerateID();
		// Puxa os dados passado pelo post
		const {name, adress, alergia,hospitalID,hospProximo} = infos;

		// insere no banco de dados
        const sql = 'INSERT INTO paciente (Id_Paciente, Nome_Paciente, Endereco_paciente, Alergia_Remedio, fk_Hospital_Id_Hospital, Hospital_Proximo) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [PacienteUUIDtrated, name, adress, alergia, hospitalID, hospProximo];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
