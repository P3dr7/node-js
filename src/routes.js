import * as hospitalController from "./Controller/hospital.js";
import paciente from "./Controller/paciente.js";
import * as PharmacyController from "./Controller/farmacia.js";
import * as DoctorController from "./Controller/medicos.js";
import * as RecController from "./Controller/receitas.js";
import * as RemController from "./Controller/remedios.js";
import * as HorPacController from "./Controller/paciente_horario.js";

export default function (fastify, options, done) {
	// Registrar rotas individualmente
	fastify.post("/hospital", hospitalController.createHospital);
	fastify.get("/hospital", hospitalController.listHospitals);
	fastify.delete("/hospital/:id", hospitalController.deleteHospital);

	paciente(fastify);

	fastify.post("/farmacia", PharmacyController.createPharmacy);
	fastify.get("/farmacia", PharmacyController.listPharmacy);
	fastify.delete("/farmacia/:id", PharmacyController.deletePharmacy);

	fastify.post("/medicos", DoctorController.createDoctor);
	fastify.get("/medicos", DoctorController.listDoctor);
	fastify.delete("/medicos/:id", DoctorController.deleteDoctor);

	fastify.post("/receitas", RecController.createRec);
	fastify.get("/receitas", RecController.listRec);
	fastify.delete("/receitas/:id", RecController.deleteRec);


	fastify.post("/remedios", RemController.createRem);
	fastify.get("/remedios", RemController.listRem);
	fastify.delete("/remedios/:id", RemController.deleteRem);

	fastify.post("/horarioPaciente", HorPacController.createHPac);
	fastify.get("/horarioPaciente", HorPacController.listHPac);
	fastify.delete("/horarioPaciente/:id", HorPacController.deleteHPac);


	done();
}
