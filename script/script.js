let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000);
let assinatura = document.getElementById('assina')

function checaAssinatura(event) {
    if (event) {
        event.preventDefault();
    }

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');

    nome.setCustomValidity('');
    email.setCustomValidity('');

    if (!nome.value.trim()) {
        nome.setCustomValidity('Por favor, digite seu nome.');
    }

    if (!email.value.trim()) {
        email.setCustomValidity('Por favor, digite seu e-mail.');
    } else if (!validateEmail(email.value)) {
        email.setCustomValidity('Por favor, digite um e-mail válido.');
    }

    if (nome.checkValidity() && email.checkValidity()) {
        alert('Obrigado por assinar nossa newsletter!');
        assinatura.style.display = 'none'
    } else {
        nome.reportValidity();
        email.reportValidity();
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

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
        const imagemSrc = livro.urlImagem ? livro.urlImagem : `img/livro${livro.idLivro}.png`;
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
}

async function carregaLivrosLancamentos() {
    const response = await fetch(urlLivros);
    const data = await response.json();

    const livrosOrdenadosPorData = data.livros.sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));
    const livrosMaisRecentes = livrosOrdenadosPorData.slice(0, 5);

    const geradorDeCards = document.getElementById("lancamentos");
    geradorDeCards.innerHTML = livrosMaisRecentes.map((livro) => {
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
}

async function carregaLivrosInfantil() {
    const response = await fetch(urlLivros);
    const data = await response.json();

    const livrosInfantil = data.livros.filter(livro => livro.Categoria_idCategoria === 6);
    const livrosAleatorios = livrosInfantil.sort(() => Math.random() - 0.5).slice(0, 5);

    const geradorDeCards = document.getElementById("infantil");
    geradorDeCards.innerHTML = livrosAleatorios.map((livro) => {
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
}



carregaUsuarios()
carregaLivrosMaisVendidos()
carregaLivrosLancamentos()
carregaLivrosInfantil()
