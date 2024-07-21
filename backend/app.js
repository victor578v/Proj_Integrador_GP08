import express from "express";
import knexdb from "./knexfile.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Livraria rodando!");
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await knexdb("usuario").select("*");
    res.status(200).json({ usuarios });
});

app.get("/livros", async (req, res) => {
    const livros = await knexdb("livro").select("*");
    res.status(200).json({ livros });
});

app.get("/livros/mais-vendidos", async (req, res) => {
    try {
        const livrosMaisVendidos = await knexdb('ItemPedido')
            .join('Livro', 'ItemPedido.Livro_idLivro', '=', 'Livro.idLivro')
            .select('Livro.idLivro', 'Livro.titulo', 'Livro.preco')
            .count('ItemPedido.idItemPedido as vendas')
            .groupBy('Livro.idLivro', 'Livro.titulo', 'Livro.preco')
            .orderBy('vendas', 'desc')
            .limit(5);

        res.status(200).json({ livros: livrosMaisVendidos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar livros mais vendidos' });
    }
});

// app.get("/tipo/:id", async (req, res) => {
//     const { id } = req.params;
//     const tipo = await knexdb("tipo").select("*").where({ id });
//     res.status(200).json({tipo});
// }
// );

// app.post("/tipo", async (req, res) => {
//     const { descricao } = req.body;
//     await knexdb("tipo").insert({ descricao });
//     res.status(201).send(`Tipo ${descricao} criado com sucesso!`);
// }
// );

// app.get("/viwer", async (req, res) => {
//     const viwer = await knexdb("viweeers").select("*")
//     .innerJoin("tipo", "viweeers.tipo_id", "=", "tipo.id")
//     res.status(200).json({viwer});
// }
// );

// app.post("/viwer", async (req, res) => {
//     const { nome, nick, moderador,sub, tipo_id, foto } = req.body;
//     await knexdb("viweeers").insert({ nome, nick, moderador,sub, tipo_id, foto });
//     res.status(201).send(`Viwer ${nome} criado com sucesso!`);
// }
// );

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
