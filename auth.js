function buscarUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const mensagem = document.getElementById("mensagemCadastro");

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.className = "auth-message error";
        return;
    }

    const usuarios = buscarUsuarios();

    const emailJaExiste = usuarios.some(usuario => usuario.email === email);

    if (emailJaExiste) {
        mensagem.textContent = "Este e-mail já está cadastrado.";
        mensagem.className = "auth-message error";
        return;
    }

    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        tipoUsuario: tipoUsuario
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    mensagem.textContent = tipoUsuario === "Administrador"
        ? "Cadastro de administrador realizado com sucesso! Redirecionando para definir evento."
        : "Cadastro realizado com sucesso! Você já pode fazer login.";
    mensagem.className = "auth-message success";

    document.getElementById("cadastroForm").reset();

    if (tipoUsuario === "Administrador") {
        localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
        setTimeout(() => {
            window.location.href = "evento-admin.html";
        }, 1200);
    }
}

function fazerLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagemLogin");

    const usuarios = buscarUsuarios();

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.email === email && usuario.senha === senha
    );

    if (!usuarioEncontrado) {
        mensagem.textContent = "E-mail ou senha inválidos.";
        mensagem.className = "auth-message error";
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    mensagem.textContent = `Bem-vindo(a), ${usuarioEncontrado.nome}! Perfil: ${usuarioEncontrado.tipoUsuario}.`;
    mensagem.className = "auth-message success";

    setTimeout(() => {
        window.location.href = usuarioEncontrado.tipoUsuario === "Administrador"
            ? "evento-admin.html"
            : "index.html";
    }, 1500);
}

function verificarUsuarioLogado() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const areaUsuario = document.getElementById("areaUsuario");

    if (!areaUsuario) return;

    if (usuarioLogado) {
        areaUsuario.innerHTML = `
            <div class="user-box">
                <strong>Usuário logado:</strong> ${usuarioLogado.nome}<br>
                <strong>Perfil:</strong> ${usuarioLogado.tipoUsuario}<br>
                <button onclick="sair()" class="btn-logout">Sair</button>
            </div>
        `;
    }
}

function sair() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.getElementById("cadastroForm");
    const loginForm = document.getElementById("loginForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", cadastrarUsuario);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", fazerLogin);
    }

    verificarUsuarioLogado();
    mostrarBoasVindas();
});

function mostrarBoasVindas() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const area = document.getElementById("boasVindas");
    if (!usuario || !area) return;
    area.innerHTML = `
        <div class="welcome-box">
            <h3>Bem-vindo(a), ${usuario.nome}!</h3>
            <p>Perfil: ${usuario.tipoUsuario}</p>
        </div>
    `;
}
