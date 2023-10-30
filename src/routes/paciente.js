import { DatabaseSQL } from '../controller/pacienteDB.js';
import { connection } from '../controller/db.js';
const database = new DatabaseSQL();

export default async function (fastify) {

    async function checkHospitalExists(nomeHospital) {
        // Consulta para verificar a existência do hospital pelo nome
        const result = await connection.query("SELECT ID_Hospital FROM hospital WHERE Nome_Hospital = ?", [nomeHospital]);
        if (result && result.length > 0) {
            return result[0].ID_Hospital; // Retorna o ID do hospital se encontrado
        }
        return null; // Retorna null se o hospital não for encontrado
    }
    

    fastify.post("/paciente", async (request, reply) => {
        const { name, adress, alergia, nomeHospital } = request.body;
    
        // Verifica a existência do hospital e obtém o ID correspondente
        const hospitalID = await checkHospitalExists(nomeHospital);
        if (!hospitalID) {
            return reply.status(400).send({ error: "Hospital não encontrado!" });
        }
    
        await database.create({
            name,
            adress,
            alergia,
            hospProximo: hospitalID,
        });
    
        return reply.status(201).send();
    });
    

fastify.get("/paciente", async (request) => {
	const search = request.query.search;

	const GEThospital = await database.list(search);

	return GEThospital;
}); 
}