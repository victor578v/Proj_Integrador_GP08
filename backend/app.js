import express from "express";
import knexdb from "./knexfile.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

const usuarios = [
    { email: 'user@example.com', senha: 'password123' }
];

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.post("/usuarios", async (req, res) => {
    const { nome, email, telefone, senha } = req.body;

    try {
        await knexdb('usuario').insert({
            nome,
            email,
            telefone,
            senha, // Em produção, a senha deve ser criptografada
            cargo: 2 // Usuário comum
        })

        res.status(201).json({ message: "Usuário criado com sucesso"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await knexdb('usuario').where({ idUsuario: id }).first();

        if (usuario) {
            res.json({ success: true, user: { nome: usuario.nome, email: usuario.email, cargo: usuario.cargo } });
        } else {
            res.json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar informações do usuário' });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knexdb('usuario').where({ email, senha }).first();

        if (usuario) {
            res.json({ success: true, user: { id: usuario.idUsuario } });
        } else {
            res.json({ success: false, message: 'E-mail ou senha incorretos.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao verificar credenciais' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});