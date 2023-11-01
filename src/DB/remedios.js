import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let remedio;
		if (search) {
			const sql = 'SELECT * FROM remedios WHERE Nome_Remedio LIKE ?';
			remedio = connection.query(sql, `%${search}%`);
		} else {
			[remedio] = await connection.query('SELECT * FROM remedios');
		}
	
		return remedio;
	}

	async create(infos) {
        const remIDtrated = GenerateID();
        const {name, qntEst, fkFarm} = infos;
        const sql = 'INSERT INTO remedios (Id_Remedio, Quantidade_Estoque, Nome_Remedio, fk_Farmacia_Id_Farmacia) VALUES (?, ?, ?, ?)';
        const values = [remIDtrated, qntEst, name, fkFarm];
        try {
            await connection.query(sql, values);
        } catch (error) {
            console.error("Erro ao inserir no banco de dados:", error);
        }
    }
    
}
