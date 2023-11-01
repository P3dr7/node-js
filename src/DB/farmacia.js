import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';


export class DatabaseSQL {
	async list(search = "") {
        
		let farm;
		if (search) {
			const sql = 'SELECT * FROM farmacia WHERE Nome_Farmacia LIKE ?';
			farm = connection.query(sql, [`%${search}%`]);
            farm = pac[0];
		} else {
			[farm] = await connection.query('SELECT * FROM farmacia');
		}
	
		return farm;
	}

	async create(infos) {
		const FarmaciaUUIDtrated = GenerateID();
		// Puxa os dados passado pelo post
		const {name, adress} = infos;
	
		// insere no banco de dados
        const sql = 'INSERT INTO farmacia (Id_Farmacia, Nome_Farmacia, Endereco_Farmacia) VALUES (?, ?, ?)';
        const values = [FarmaciaUUIDtrated, name, adress];

		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}