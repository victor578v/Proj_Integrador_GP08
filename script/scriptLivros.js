
// BACKEND COMECA AQUI

let urlUsuarios = "http://localhost:3000/usuarios"
let urlLivros = "http://localhost:3000/livros"

async function verificarCargo() {
    const user = localStorage.getItem('user');

    if (user) {
        const userData = JSON.parse(user);
        console.log('Usuário logado:', userData);
        const titulo = document.getElementById("titulo")

        // Faça uma requisição ao backend para obter as informações do usuário
        const response = await fetch(`http://localhost:3000/usuarios/${userData.id}`);
        const data = await response.json();

        console.log(data)

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

        // Certifica-se de que a resposta contém os dados esperados
        if (!data.livros) {
            throw new Error('Formato de dados inesperado');
        }

        // Seleciona o elemento onde os livros serão exibidos
        const geradorDeCards = document.getElementById("livros");

        // Gera os cards para todos os livros
        geradorDeCards.innerHTML = data.livros.map((livro) => {
            const imagemSrc = livro.imagemUrl ? livro.imagemUrl : `img/livro${livro.idLivro}.png`;
            return `
                <div class="card">
                    <img src="${imagemSrc}" alt="Capa do livro ${livro.titulo}">
                    <h1>${livro.titulo}</h1>
                    <h2>R$ ${livro.preco}</h2>
                    <h3>ou 2x de R$ ${(livro.preco / 2)}</h3>
                    <button>Comprar</button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao carregar os livros:', error);
    }
}

// Chama a função para carregar e exibir todos os livros

carregaTodosOsLivros();
carregaUsuarios()
verificarCargo()