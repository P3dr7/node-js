import { DatabaseSQL } from "../DB/estoqueFarmacia.js";
import {
	checkHospitalExists,
	checkFarmacialExists,
} from "../config/Verifica.js";

const database = new DatabaseSQL();

export async function createTrab(request, reply) {
	if (FarmInfo.endereco === HospInfo.endereco) {
		try {
			const { farmacia, hospital } = request.body;
			const FarmInfo = await checkFarmacialExists(farmacia);
			const HospInfo = await checkHospitalExists(hospital);
			const HospId = HospInfo ? HospInfo.id : null;
			const FarmId = FarmInfo ? FarmInfo.id : null;
			if (!DoctorId) {
				return reply.status(400).send({ error: "Doutor não encontrado!" });
			}
			if (!HospId) {
				return reply.status(400).send({ error: "Hospital não encontrado!" });
			}
			await database.create({
				idFarmacia: FarmId,
				idHospital: HospId,
			});
			return reply.status(201).send();
		} catch (error) {
			console.error(error);
			return reply
				.status(500)
				.send({ error: "Ocorreu um erro interno do servidor." });
		}
	}
}
