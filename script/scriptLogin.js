document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const formIsValid = await validarFormulario();

    if (formIsValid) {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (response.ok) {
                const result = await response.json();

                if (result.success) {
                    localStorage.setItem('user', JSON.stringify(result.user)); 
                    alert('Login realizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    alert(result.message || 'Falha no login');
                }
            } else {
                alert('Erro na conexão com o servidor.');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login. Por favor, tente novamente.');
        }
    }
});

async function validarFormulario() {
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    email.setCustomValidity('');
    senha.setCustomValidity('');

    let formIsValid = true;

    if (!email.value.trim()) {
        email.setCustomValidity('Por favor, digite seu e-mail.');
        formIsValid = false;
    } else if (!validateEmail(email.value)) {
        email.setCustomValidity('Por favor, digite um e-mail válido.');
        formIsValid = false;
    }

    if (!senha.value.trim()) {
        senha.setCustomValidity('Por favor, digite sua senha.');
        formIsValid = false;
    }

    return formIsValid;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


function verificarAutenticacao() {
    const user = localStorage.getItem('user');
    if (user) {
        console.log('Usuário logado:', JSON.parse(user));
    } else {
        window.location.href = 'login.html';
    }
}

