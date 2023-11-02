import { DatabaseSQL } from "../DB/remedios.js";
import { createEstoque } from "./estoqueFarmacia.js"
import { checkFarmacialExists, checkRemedioRepeat} from "../config/Verifica.js";
import { createTem } from './tem.js'
const database = new DatabaseSQL();

export const createRem = async (request, reply) => {
	try {
	const { name, qntEst, nomeFarmacia } = request.body;

	// Verifica a existência do hospital e obtém o ID correspondente
	const FarmInfo = await checkFarmacialExists(nomeFarmacia);
	const FarmID = FarmInfo ? FarmInfo.id : null;
	if (!FarmID) {
		return reply.status(400).send({ error: "Farmacia não encontrado!" });
	}

	const estoqueRequest = {
        body: {
            farmacia: nomeFarmacia, 
			remedio: name
        },
    };

    const estoqueResponse = {
        status: (statusCode) => {
            return {
                send: (body) => {
                    
                },
            };
        },
    };
	await createTem();
	const canInsert = await checkRemedioRepeat({ nameRem: name, farmaciaId: FarmID });

	if (!canInsert) {
		return reply.status(400).send({ error: "Já existe esse remédio nessa farmácia" });
	}

	await database.create({
		name,
		qntEst,
		fkFarm: FarmID,
	});

	await createEstoque(estoqueRequest, estoqueResponse);

	return reply.status(201).send();
 	}catch (error) {
		console.error('Erro ao criar Remedio:', error);
		return reply.status(500).send({ error: "Ocorreu um erro interno do servidor." });
	}
};
export const listRem = async (request, reply) => {
	const search = request.query.search;

	const GETRem = await database.list(search);

	return GETRem;
};

export const deleteRem = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
