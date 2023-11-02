import {checkEnderecoFH, existeNaTabelaTem} from "../config/Verifica.js"
import { DatabaseSQL } from "../DB/tem.js";
const database = new DatabaseSQL();

export async function createTem() {

    const teste = await checkEnderecoFH();

    if (!teste || teste.length === 0) {
        return reply.status(404).send({ error: "Farmácia ou hospital não encontrados!" });
    }

    try {
        for (const item of teste) {
            const { Id_Farmacia, Id_Hospital } = item;

            // Verifica se o par já existe na tabela
            const existe = await existeNaTabelaTem(Id_Farmacia, Id_Hospital);
            if (existe) {
                // console.log(`O par Id_Farmacia: ${Id_Farmacia} e Id_Hospital: ${Id_Hospital} já existe na tabela.`);
                continue;  // Pula para o próximo item
            }

            // Se não existe, insere na tabela
            await database.create({
                idFarmacia: Id_Farmacia,
                idHospital: Id_Hospital,
            });
        }

        return
    } catch (error) {
        console.error('Erro ao inserir dados:', error);

        if (!reply) {
            console.error('Reply é undefined');
            return;
        }

        return reply.status(500).send({ error: "Ocorreu um erro interno do servidor." });
	}
}

