// import { createServer } from 'node:http'

// const server = createServer((request, response) =>{
//     response.write('oi')
//     return response.end()
// })

// server.listen(3333)
// import { DatabaseMemory } from "./database-memory.js";
import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
	const { title, description, duration } = request.body;
	await database.create({
		title,
		description,
		duration,
	});
	return reply.status(201).send();
});
server.get("/videos", async (request) => {
	const search = request.query.search;

	const videos = await database.list(search);

	return videos;
});

server.put("/videos/:id", (request, reply) => {
	const videoId = request.params.id;
	const { title, description, duration } = request.body;

	const video = database.update(videoId, {
		title,
		description,
		duration,
	});
	return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
	const videoId = request.params.id;

	database.delete(videoId);
	return reply.status(204).send();
});

server.listen({
	port: 3333,
});
