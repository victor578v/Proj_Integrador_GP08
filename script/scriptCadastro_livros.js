// Seleciona o input de URL
const inputUrl = document.getElementById('capaUrl');
// Seleciona o elemento de preview da imagem
const previewImg = document.getElementById('capaPreview');

// Função para validar se a URL é válida
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Adiciona um ouvinte de evento para o input de URL
inputUrl.addEventListener('input', function() {
    const url = inputUrl.value;

    if (url && isValidUrl(url)) {
        // Atualiza o src da imagem de preview com o valor do input de URL
        previewImg.src = url;
        previewImg.style.display = 'block';
    } else {
        // Oculta a imagem de preview se a URL for inválida ou vazia
        previewImg.style.display = 'none';
    }
});

async function validarFormularioLivro() {
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");
    const isbn = document.getElementById("isbn");
    const preco = document.getElementById("preco");
    const dataPublicacao = document.getElementById("dataPublicacao");
    const Categoria_idCategoria = document.getElementById("categoria");
    const imagemUrl = document.getElementById("capaUrl");

    titulo.setCustomValidity('');
    autor.setCustomValidity('');
    isbn.setCustomValidity('');
    preco.setCustomValidity('');
    dataPublicacao.setCustomValidity('');
    Categoria_idCategoria.setCustomValidity('');
    imagemUrl.setCustomValidity('');

    let formIsValid = true;

    if (!titulo.value.trim()) {
        titulo.setCustomValidity('Por favor, digite o título do livro.');
        formIsValid = false;
    }

    if (!autor.value.trim()) {
        autor.setCustomValidity('Por favor, digite o autor do livro.');
        formIsValid = false;
    }

    if (!isbn.value.trim()) {
        isbn.setCustomValidity('Por favor, digite o ISBN do livro.');
        formIsValid = false;
    }

    if (!preco.value.trim()) {
        preco.setCustomValidity('Por favor, digite o preço do livro.');
        formIsValid = false;
    }

    if (!dataPublicacao.value.trim()) {
        dataPublicacao.setCustomValidity('Por favor, digite a data de publicação do livro.');
        formIsValid = false;
    }

    if (!Categoria_idCategoria.value.trim()) {
        Categoria_idCategoria.setCustomValidity('Por favor, digite a categoria do livro.');
        formIsValid = false;
    }

    if (!imagemUrl.value.trim()) {
        imagemUrl.setCustomValidity('Por favor, digite a URL da imagem do livro.');
        formIsValid = false;
    }

    return formIsValid;
}

const livroForm = document.getElementById("registrationForm");
livroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (await validarFormularioLivro()) {
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const isbn = document.getElementById("isbn").value;
        const preco = document.getElementById("preco").value;
        const dataPublicacao = document.getElementById("dataPublicacao").value;
        const Categoria_idCategoria = document.getElementById("categoria").value;
        const imagemUrl = document.getElementById("capaUrl").value;

        const livro = {
            titulo,
            autor,
            isbn,
            preco,
            dataPublicacao,
            Categoria_idCategoria,
            imagemUrl
        };

        try {
            const response = await fetch('http://localhost:3000/livros', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livro)
            });

            if (response.ok) {
                alert('Livro cadastrado com sucesso!');
                livroForm.reset();
                // Redirecionar ou atualizar a página conforme necessário
            } else {
                const errorData = await response.json();
                console.error('Falha ao enviar dados:', errorData.error);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    } else {
        // Exibe as mensagens de erro personalizadas
        const titulo = document.getElementById("titulo");
        const autor = document.getElementById("autor");
        const isbn = document.getElementById("isbn");
        const preco = document.getElementById("preco");
        const dataPublicacao = document.getElementById("dataPublicacao");
        const Categoria_idCategoria = document.getElementById("Categoria_idCategoria");
        const imagemUrl = document.getElementById("imagemUrl");

        titulo.reportValidity();
        autor.reportValidity();
        isbn.reportValidity();
        preco.reportValidity();
        dataPublicacao.reportValidity();
        Categoria_idCategoria.reportValidity();
        imagemUrl.reportValidity();
    }
});

const urlCategorias = "http://localhost:3000/categorias";

async function carregaCategorias() {
    try {
        const response = await fetch(urlCategorias);
        const data = await response.json();
        const categorias = data.categorias;

        const selectCategoria = document.getElementById("categoria");
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.idCategoria;
            option.text = categoria.nome;
            selectCategoria.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

// Chama a função para carregar as categorias quando a página for carregada
document.addEventListener("DOMContentLoaded", carregaCategorias);

