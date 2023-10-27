import { fastify } from "fastify";
import { DatabaseSQL } from "./controller/hospital";

const server = fastify();
const database = new DatabaseSQL();

server.post("/person", async (request, reply) => {
	const { name, adress, alergia } = request.body;
	await database.create({
		name,
		adress,
		alergia,
	});
	return reply.status(201).send();
});

server.get("/hospital", () => {
	const GEThospital = database.list();

	return GEThospital;
});

server.listen({
	port: 3333,
});
