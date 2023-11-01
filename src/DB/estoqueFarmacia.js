import { connection } from './db.js';

export class DatabaseSQL {
	
	async create(infos) {
		const { idFarmacia, idRemedio } = infos;
        const sql = 'INSERT INTO trabalha (fk_Farmacia_Id_Farmacia, fk_Remedios_Id_Remedio) VALUES (?, ?)';
        const values = [idFarmacia, idRemedio];
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}