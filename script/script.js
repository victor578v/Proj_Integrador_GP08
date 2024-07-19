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
