const burger_menu = document.querySelector("#burger_menu");
const navbar = document.querySelector("#navbar");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000);

burger_menu.addEventListener("click", () => {
    if (navbar.classList.contains("mostra")) {
        navbar.classList.remove("mostra");
        setTimeout(() => {
            navbar.style.display = "none";
        }, 500);
    } else {
        navbar.style.display = "block";
        setTimeout(() => {
            navbar.classList.add("mostra");
        }, 10);
    }
});

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
    });

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetTimer();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    resetTimer();
}

function trocaSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetTimer();
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

showSlide(currentSlide);

// BACKEND COMECA AQUI

let urlUsuarios = "http://localhost:3000/usuarios"
let urlLivros = "http://localhost:3000/livros"
let urlLivrosMaisVendidos = "http://localhost:3000/livros/mais-vendidos";

async function carregaUsuarios() {
    const response = await fetch(urlUsuarios)
    const data = await response.json()
}

async function carregaLivrosMaisVendidos() {
    const response = await fetch(urlLivrosMaisVendidos);
    const data = await response.json();

    const geradorDeCards = document.getElementById("mais_vendidos");
    geradorDeCards.innerHTML = data.livros.map((livro) => {
        return `
            <div class="card">
                <img src="${'img/livro' + livro.idLivro + '.png'}" alt="Capa do livro ${livro.titulo}">
                <h1>${livro.titulo}</h1>
                <h2>R$ ${livro.preco}</h2>
                <h3>ou 2x de R$ ${livro.preco / 2}</h3>
                <button>Comprar</button>
            </div>
        `;
    }).join('');
}

async function carregaLivrosLancamentos() {
    const response = await fetch(urlLivros);
    const data = await response.json();

    // Ordena os livros por data de publicação (mais recentes primeiro)
    const livrosOrdenadosPorData = data.livros
        .sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));

    // Seleciona os primeiros 5 livros mais recentes
    const livrosMaisRecentes = livrosOrdenadosPorData.slice(0, 5);

    const geradorDeCards = document.getElementById("lancamentos");
    geradorDeCards.innerHTML = livrosMaisRecentes.map((livro) => {
        return `
            <div class="card">
                <img src="${'img/livro' + livro.idLivro + '.png'}" alt="Capa do livro ${livro.titulo}">
                <h1>${livro.titulo}</h1>
                <h2>R$ ${livro.preco}</h2>
                <h3>ou 2x de R$ ${livro.preco / 2}</h3>
                <button>Comprar</button>
            </div>
        `;
    }).join('');
}

async function carregaLivrosInfantil() {
    const response = await fetch(urlLivros);
    const data = await response.json();

    // Filtra livros da categoria "Infantil" (ID 6)
    const livrosInfantil = data.livros.filter(livro => livro.Categoria_idCategoria === 6);

    // Embaralha o array e seleciona os primeiros 5 livros
    const livrosAleatorios = livrosInfantil
        .sort(() => Math.random() - 0.5) // Embaralha o array
        .slice(0, 5); // Seleciona os primeiros 5 livros após o embaralhamento

    const geradorDeCards = document.getElementById("infantil");
    geradorDeCards.innerHTML = livrosAleatorios.map((livro) => {
        return `
            <div class="card">
                <img src="${'img/livro' + livro.idLivro + '.png'}" alt="Capa do livro ${livro.titulo}">
                <h1>${livro.titulo}</h1>
                <h2>R$ ${livro.preco}</h2>
                <h3>ou 2x de R$ ${livro.preco / 2}</h3>
                <button>Comprar</button>
            </div>
        `;
    }).join('');
}


carregaUsuarios()
carregaLivrosMaisVendidos()
carregaLivrosLancamentos()
carregaLivrosInfantil()
