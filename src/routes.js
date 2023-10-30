import * as hospitalController from "./routes/hospital.js";
import paciente from "./routes/paciente.js";

export default function (fastify, options, done) {
	// Registrar rotas individualmente
	fastify.post("/hospital", hospitalController.createHospital);
	fastify.get("/hospital", hospitalController.listHospitals);
	fastify.delete("/hospital/:id", hospitalController.deleteHospital);

	paciente(fastify);

	done();
}
