import { DatabaseSQL } from './controller/hospital.js';
import fastify from 'fastify';

const database = new DatabaseSQL();
const server = new fastify();

server.post("/hospital", async (request, reply) => {
	const { name, adress } = request.body;
	await database.create({
		name,
		adress,
	});
	return reply.status(201).send();
});

server.get("/hospital", async (request) => {
	const search = request.query.search;

	const GEThospital = await database.list(search);

	return GEThospital;
});

server.listen({ port: 3333 }, (err) => {
	if (err) {
	  fastify.log.error(err)
	  process.exit(1)
	}
});
