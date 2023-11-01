import { connection } from './db.js';

export class DatabaseSQL {
	
	async create(infos) {
		const { idMedico, idHospital } = infos;
        const sql = 'INSERT INTO trabalha (fk_Hospital_Id_Hospital, fk_Medicos_Id_Medico) VALUES (?, ?)';
        const values = [idHospital, idMedico];
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}