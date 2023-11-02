import { connection } from './db.js';

export class DatabaseSQL {
	
	async create(infos) {
		const { idFarmacia, idHospital } = infos;
        const sql = 'INSERT INTO tem (fk_Hospital_Id_Hospital, fk_Farmacia_Id_Farmacia) VALUES (?, ?)';
        const values = [idHospital, idFarmacia];
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}