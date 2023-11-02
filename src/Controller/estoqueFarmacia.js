import { DatabaseSQL } from "../DB/estoqueFarmacia.js";
import {
	checkFarmacialExists,
	checkRemedioExists
} from "../config/Verifica.js";

const database = new DatabaseSQL();

export async function createEstoque(request, reply) {
    try {
        const { farmacia, remedio } = request.body;

        const FarmInfo = await checkFarmacialExists(farmacia);
        const RemId = await checkRemedioExists(remedio);
        const FarmId = FarmInfo ? FarmInfo.id : null;
        if (!FarmId) {
            return reply.status(400).send({ error: "Farmácia não encontrada!" });
        }

        await database.create({
            idFarmacia: FarmId,
            idRemedio: RemId
        });

        return reply.status(201).send();
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        return reply.status(500).send({ error: "Ocorreu um erro interno do servidor." });
    }
}