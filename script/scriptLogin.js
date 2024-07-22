document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const formIsValid = await validarFormulario();

    if (formIsValid) {
        // Enviar os dados para o backend
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
                    // Salvar informações de sessão (e.g., token)
                    localStorage.setItem('user', JSON.stringify(result.user)); // Armazena informações do usuário
                    alert('Login realizado com sucesso!');
                    window.location.href = 'index.html'; // Redireciona após o login
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
    // Função simples para validar o formato do e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


function verificarAutenticacao() {
    const user = localStorage.getItem('user');
    if (user) {
        // Usuário está logado, redirecionar ou mostrar informações
        console.log('Usuário logado:', JSON.parse(user));
    } else {
        // Usuário não está logado, redirecionar para login
        window.location.href = 'login.html';
    }
}

// Chame esta função na página protegida
// verificarAutenticacao();
