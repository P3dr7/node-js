import { GenerateID } from '../config/ID.js';
import { connection } from './db.js';

export class DatabaseSQL {
	async list(search = "") {
        
		let timepac;
		if (search) {
			const sql = 'SELECT * FROM paciente_horario WHERE Nome_Paciente LIKE ?';
			timepac = connection.query(sql, [`%${search}%`]);
            timepac = timepac[0];
		} else {
			[timepac] = await connection.query('SELECT * FROM paciente_horario');
		}
	
		return timepac;
	}

	async create(infos) {
		const timePacUUIDtrated = GenerateID();
		// Puxa os dados passado pelo post
		const {nomePac, AtendimentoPac, EntradaPac,SaidaPac, fkIdPac} = infos;
		// console.log(hospProximo)
		// insere no banco de dados
        const sql = 'INSERT INTO paciente_horario (Id_Horario, Nome_Paciente, fk_Id_Paciente,Atendimento_Paciente, Entrada_Paciente, Saida_Paciente) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [timePacUUIDtrated, nomePac, fkIdPac, AtendimentoPac, EntradaPac, SaidaPac];
		//console.log(hospitalID);
		// Aqui executa a inserção 
		try {
			await connection.query(sql, values);
		} catch (error) {
			console.error("Erro ao inserir no banco de dados:", error);
		}
		
    };
}
