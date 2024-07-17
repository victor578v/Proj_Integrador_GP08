const burger_menu = document.querySelector("#burger_menu");
const navbar = document.querySelector("#navbar");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 3000);

burger_menu.addEventListener("click", () =>{
    navbar.classList.toggle("mostra");
})

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

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

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

showSlide(currentSlide);
