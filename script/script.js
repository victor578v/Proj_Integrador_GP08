document.getElementById('burger_menu').addEventListener('click', function() {
    let navbar = document.getElementById('navbar');
    if (navbar.style.display === 'none') {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});