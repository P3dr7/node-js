import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let hosp;
		if (search) {
			const sql = 'SELECT * FROM hospital WHERE Nome_Hospital LIKE ?';
			hosp = connection.query(sql, `%${search}%`);
			// hosp= hosp[0];
		} else {
			[hosp] = await connection.query('SELECT * FROM hospital');
		}
	
		return hosp;
	}

	async create(infos) {
		const hospitalIDtrated = GenerateID();
		// Puxa os dados passado pelo post
		const {name, adress} = infos;
		// insere no banco de dados
        const sql = 'INSERT INTO hospital (ID_Hospital, Nome_Hospital, Endereco_Hospital) VALUES (?, ?, ?)';
        const values = [hospitalIDtrated, name, adress];
		//console.log(hospitalID);
		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
