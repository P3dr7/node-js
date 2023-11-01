import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let doc;
		if (search) {
			const sql = 'SELECT * FROM medicos WHERE Nome_Medico LIKE ?';
			doc = connection.query(sql, [`%${search}%`]);
            doc = doc[0];
		} else {
			[doc] = await connection.query('SELECT * FROM medicos');
		}
	
		return doc;
	}

	async create(infos) {
		const DoctorUUIDtrated = GenerateID();
		// Puxa os dados passado pelo post
		const {name, crm, horario, hospital} = infos;
	
		// insere no banco de dados
        const sql = 'INSERT INTO medicos (Id_Medico, Nome_Medico, CRM_Medico, Hospital, Horario_Plantao) VALUES (?, ?, ?, ?,TIME(?))';
        const values = [DoctorUUIDtrated, name, crm, hospital, horario];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
