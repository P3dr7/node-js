import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let presc;
		if (search) {
			const sql = 'SELECT * FROM receitas WHERE Nome_receita LIKE ?';
			presc = connection.query(sql, `%${search}%`);
		} else {
			[presc] = await connection.query('SELECT * FROM receitas');
		}
	
		return presc;
	}

	async create(infos) {
        const presIDtrated = GenerateID();
        const {name, pac, finalDate, ID_Doc, medico_resp} = infos;
        const sql = 'INSERT INTO receitas (Id_Receita, Duracao_Inicial, Duracao_final, fk_Medicos_Id_Medico, Nome_receita, Paciente, Medico_Resp) VALUES (?, CURDATE(), ?, ?, ?, ?, ?)';
        const values = [presIDtrated, finalDate, ID_Doc, name, pac,medico_resp];
        try {
            await connection.query(sql, values);
        } catch (error) {
            console.error("Erro ao inserir no banco de dados:", error);
        }
    }
    
}
