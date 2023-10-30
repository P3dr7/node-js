import { randomUUID }from 'node:crypto';
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
		// Limpa o UUID deixando apenas numeros
		const hospitalID = randomUUID().replace(/\D/g, '');
		let strNumber = String(hospitalID);
        if (strNumber.length > 18) {
            strNumber = strNumber.substring(0, 18);
        }
        let hospitalIDtrated = parseInt(strNumber, 10);
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
