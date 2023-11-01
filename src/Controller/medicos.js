import { DatabaseSQL } from "../DB/medicos.js";
import { checkHospitalExists } from "../config/Verifica.js"
import { createTrab } from "./trabalha.js"
const database = new DatabaseSQL();

export const createDoctor = async (request, reply) => {
    const { name, crm, horario, nomeHosp } = request.body;
    const hospInfo = await checkHospitalExists(nomeHosp);
    const hospId = hospInfo ? hospInfo.id : null;
    if (!hospId) {
        return reply.status(400).send({ error: "Hospital não encontrado!" });
    }

    const trabRequest = {
        body: {
            medico: name,
            hospital: nomeHosp,
        },
    };

    const trabResponse = {
        status: (statusCode) => {
            return {
                send: (body) => {
                    
                },
            };
        },
    };

	await database.create({
        name,
        crm,
        hospital: nomeHosp,
        horario,
    });
	
    await createTrab(trabRequest, trabResponse);

    return reply.status(201).send();
};

export const listDoctor = async (request) => {
	const search = request.query.search;
	const doctor = await database.list(search);
	return doctor;
};

export const deleteDoctor = async (request) => {
	const id = request.params.id;
	await database.delete(id);
	return { status: "Deleted successfully" };
};
