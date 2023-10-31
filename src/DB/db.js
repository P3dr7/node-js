import mysql from "mysql2/promise";

let connection;

export async function initializeDatabase() {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "db_hospital",
            });

            const [results, fields] = await connection.query("SELECT * FROM `hospital`");
            // console.log(results);
            // console.log(fields);
        } catch (err) {
            console.error("Erro ao estabelecer a conexão ou executar a consulta:", err.message);
        }
    }
    return connection;
}

initializeDatabase();

export { connection };
