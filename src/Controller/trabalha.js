import { DatabaseSQL } from "../DB/trabalha.js";
import { checkHospitalExists, checkMedicoExists } from "../config/Verifica.js";

const database = new DatabaseSQL();

export async function createTrab(request, reply) {
    try {
        const { medico, hospital } = request.body;
        const DoctorId = await checkMedicoExists(medico);
        const HospInfo = await checkHospitalExists(hospital);
        const HospId = HospInfo ? HospInfo.id : null;
        if (!DoctorId) {
            return reply.status(400).send({ error: "Doutor não encontrado!" });
        }
        if (!HospId) {
            return reply.status(400).send({ error: "Hospital não encontrado!" });
        }
        await database.create({
            idMedico: DoctorId, 
            idHospital: HospId,
        });
        return reply.status(201).send();
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Ocorreu um erro interno do servidor." });
    }
}