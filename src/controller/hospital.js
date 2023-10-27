import { randomUUID }from 'node:crypto';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let hosp;
		if (search) {
			const sql = 'SELECT * FROM hospital WHERE title LIKE ?';
			hosp = connection.query(sql, [`%${search}%`]);
		} else {
			[hosp] = await connection.query('SELECT * FROM hospital');
		}
	
		return hosp;
	}

	async create(infos) {
		// Limpa o UUID deixando apenas numeros
		const hospitalID = randomUUID().replace(/\D/g, '');
		// Puxa os dados passado pelo post
		const {name, adress} = infos;
		// insere no banco de dados
        const sql = 'INSERT INTO hospital (ID_Hospital, Nome_Hospital, Endereco_Hospital) VALUES (?, ?, ?)';
        const values = [hospitalID, name, adress];
		console.log(hospitalID);
		// Aqui executa a inserção 
        await connection.query(sql, values);
    };
}
