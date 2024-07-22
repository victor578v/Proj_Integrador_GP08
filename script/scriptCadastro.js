const form = document.getElementById("registrationForm")

async function validarFormulario() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const senha = document.getElementById("senha");
    const repetirSenha = document.getElementById("repetirSenha");
    const termos = document.getElementById("termos");

    nome.setCustomValidity('');
    email.setCustomValidity('');
    telefone.setCustomValidity('');
    senha.setCustomValidity('');
    repetirSenha.setCustomValidity('');
    termos.setCustomValidity('');

    let formIsValid = true;

    // Validação personalizada
    if (!nome.value.trim()) {
        nome.setCustomValidity('Por favor, digite seu nome.');
        formIsValid = false;
    }

    if (!email.value.trim()) {
        email.setCustomValidity('Por favor, digite seu e-mail.');
        formIsValid = false;
    } else if (!validateEmail(email.value)) {
        email.setCustomValidity('Por favor, digite um e-mail válido.');
        formIsValid = false;
    }

    if (!telefone.value.trim()) {
        telefone.setCustomValidity('Por favor, digite seu telefone.');
        formIsValid = false;
    }

    if (!senha.value.trim()) {
        senha.setCustomValidity('Por favor, digite sua senha.');
        formIsValid = false;
    }

    if (!repetirSenha.value.trim()) {
        repetirSenha.setCustomValidity('Por favor, repita sua senha.');
        formIsValid = false;
    } else if (senha.value !== repetirSenha.value) {
        senha.setCustomValidity('As senhas não coincidem.');
        repetirSenha.setCustomValidity('As senhas não coincidem.');
        formIsValid = false;
    }

    if (!termos.checked) {
        termos.setCustomValidity('Você deve aceitar os termos e condições.');
        formIsValid = false;
    }

    // Verificar e-mail e telefone já cadastrados
    if (formIsValid) {
        try {
            const usuariosResponse = await fetch('http://localhost:3000/usuarios');
            const usuariosData = await usuariosResponse.json();
            const usuarios = usuariosData.usuarios;
            const emailExists = usuarios.some(user => user.email === email.value);
            const telefoneExists = usuarios.some(user => user.telefone === telefone.value);

            if (emailExists) {
                email.setCustomValidity('O e-mail já está cadastrado.');
                formIsValid = false;
            }

            if (telefoneExists) {
                telefone.setCustomValidity('O telefone já está cadastrado.');
                formIsValid = false;
            }

        } catch (error) {
            console.error('Erro ao verificar dados:', error);
            formIsValid = false;
        }
    }

    return formIsValid;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (await validarFormulario()) {
        // Pegando os valores dos inputs
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const senha = document.getElementById("senha").value;
        const repetirSenha = document.getElementById("repetirSenha").value;
        const termos = document.getElementById("termos").checked;

        // Montando o objeto com os dados do formulário
        const usuario = {
            nome,
            email,
            telefone,
            senha,
            repetirSenha
        };

        try {
            // Enviando os dados do usuário
            const response = await fetch('http://localhost:3000/usuarios', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                alert('Conta criada com sucesso!');
                document.getElementById("registrationForm").reset();
            } else {
                const errorData = await response.json();
                console.error('Falha ao enviar dados:', errorData.error);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    } else {
        // Exibe as mensagens de erro personalizadas
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const telefone = document.getElementById('telefone');
        const senha = document.getElementById('senha');
        const repetirSenha = document.getElementById('repetirSenha');
        const termos = document.getElementById('termos');

        nome.reportValidity();
        email.reportValidity();
        telefone.reportValidity();
        senha.reportValidity();
        repetirSenha.reportValidity();
        termos.reportValidity();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}