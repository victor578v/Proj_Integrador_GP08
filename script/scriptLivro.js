async function carregarDetalhesEVerificarCargo() {
    const params = new URLSearchParams(window.location.search);
    const idLivro = params.get('id');

    if (!idLivro) {
        console.error('ID do livro não encontrado');
        return;
    }

    try {

        const livroResponse = await fetch(`http://localhost:3000/livros/${idLivro}`);
        const livro = await livroResponse.json();
        const imagemSrc = livro.imagemUrl ? livro.imagemUrl : `img/livro${livro.idLivro}.png`;


        document.getElementById('livro').innerHTML = `
            <div class="container-imagem">
                 <img src="${imagemSrc}">
            </div>
            <div class="informacoes">
                <p>Codigo ISBN: ${livro.isbn}</p>
                <h1>${livro.titulo}</h1>
                <hr/>
                <div class="preco_botao" id="preco_botao">
                    <div class="preco">
                        <h2>R$ ${livro.preco}</h2>
                        <h3>Ou 2x de R$ ${livro.preco / 2}</h3>
                    </div>
                    <button id="comprarBtn">Comprar</button>
                </div>
                <hr/>
                <h4>${livro.descricao || 'Descrição não disponível.'}</h4>
            </div>
        `;


        const user = localStorage.getItem('user');

        if (user) {
            const userData = JSON.parse(user);
            console.log('Usuário logado:', userData);


            const userResponse = await fetch(`http://localhost:3000/usuarios/${userData.id}`);
            const data = await userResponse.json();

            if (data.success) {
                const precoBotao = document.getElementById("preco_botao");

                if (data.user.cargo == 1) {
                    const excluirBtn = document.createElement('button');
                    excluirBtn.textContent = 'Excluir';
                    excluirBtn.id = 'excluirBtn';

                    precoBotao.appendChild(excluirBtn);

                    excluirBtn.addEventListener('click', async () => {
                        try {
                            const deleteResponse = await fetch(`http://localhost:3000/livros/${idLivro}`, {
                                method: 'DELETE'
                            });
                            const result = await deleteResponse.json();

                            if (result.success) {
                                alert('Livro excluído com sucesso.');
                                window.location.href = '../index.html';
                            } else {
                                alert(result.message);
                            }
                        } catch (error) {
                            console.error('Erro ao excluir o livro:', error);
                        }
                    });
                }
            } else {
                console.error(data.message);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do livro ou verificar cargo do usuário:', error);
    }
}

carregarDetalhesEVerificarCargo();
