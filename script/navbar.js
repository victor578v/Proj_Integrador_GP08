const burger_menu = document.querySelector("#burger_menu");
const navbar = document.querySelector("#navbar");

async function verificarLogado() {
    const user = localStorage.getItem('user');
    const conta = document.getElementById('conta');
    const userArea = document.getElementById('usuario');
    const userArea2 = document.getElementById('usuario2');
    const logout = document.getElementById('logout')

    if (user) {
        const userData = JSON.parse(user);
        console.log('Usuário logado:', userData);

        // Faça uma requisição ao backend para obter as informações do usuário
        const response = await fetch(`http://localhost:3000/usuarios/${userData.id}`);
        const data = await response.json();

        console.log(data)

        if (data.success) {
            conta.style.display = 'none';
            userArea.style.display = 'flex';
            userArea2.style.display = 'none';

            userArea.innerHTML = `
                <h1>Olá ${data.user.nome}</h1>
                <button onclick="logout()">Logout</button>
            `;
        } else {
            console.error(data.message);
        }
    } else {
        logout.style.display = 'none'
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = './index.html';
}

verificarLogado()

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