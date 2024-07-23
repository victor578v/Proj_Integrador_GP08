
// BACKEND COMECA AQUI

let urlUsuarios = "http://localhost:3000/usuarios"
let urlLivros = "http://localhost:3000/livros"

async function verificarCargo() {
    const user = localStorage.getItem('user');

    if (user) {
        const userData = JSON.parse(user);
        console.log('Usuário logado:', userData);
        const titulo = document.getElementById("titulo")

        const response = await fetch(`http://localhost:3000/usuarios/${userData.id}`);
        const data = await response.json();

        if (data.success) {
            if (data.user.cargo == 1) {
                titulo.innerHTML = `
                <h1>Nossa selecao de livros</h1>
                <a href="./cadastro_livros.html"><button>Cadastrar livro</button></a>
            `;
            } else {
                titulo.innerHTML = `
                <h1>Nossa selecao de livros</h1>
            `;
            }
        } else {
            console.error(data.message);
        }
    }
}

async function carregaUsuarios() {
    const response = await fetch(urlUsuarios)
    const data = await response.json()
}

async function carregaTodosOsLivros() {
    try {
        const response = await fetch(urlLivros);
        const data = await response.json();

        if (!data.livros) {
            throw new Error('Formato de dados inesperado');
        }

        const geradorDeCards = document.getElementById("livros");

        geradorDeCards.innerHTML = data.livros.map((livro) => {
            const imagemSrc = livro.imagemUrl ? livro.imagemUrl : `img/livro${livro.idLivro}.png`;
            return `
            <div class="card" onclick="redirecionarParaLivro(${livro.idLivro})">
                <img src="${imagemSrc}" alt="Capa do livro ${livro.titulo}">
                <h1>${livro.titulo}</h1>
                <h2>R$ ${livro.preco}</h2>
                <h3>ou 2x de R$ ${(livro.preco / 2).toFixed(2)}</h3>
                <button>Comprar</button>
            </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao carregar os livros:', error);
    }
}

carregaTodosOsLivros();
carregaUsuarios()
verificarCargo()