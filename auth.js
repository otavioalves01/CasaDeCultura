
const SUPABASE_URL = "https://aqeapkrhjikdlucdkblm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Pj1Sk4eBXxYYO5iQAhEO7A_ckb-KQyf";

if (!window.supabase) {
    console.error("Supabase não foi carregado. Coloque a CDN antes do auth.js no HTML.");
}

if (
    !SUPABASE_ANON_KEY ||
    SUPABASE_ANON_KEY.includes("COLE_AQUI") ||
    SUPABASE_ANON_KEY.length < 40
) {
    console.error("Chave do Supabase ausente ou inválida. Troque SUPABASE_ANON_KEY no auth.js pela chave real do painel Supabase.");
}

const supabaseClient = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

window.supabaseClient = supabaseClient;

function mostrarMensagem(elemento, texto, tipo) {
    if (!elemento) return;
    elemento.textContent = texto;
    elemento.className = `auth-message ${tipo}`;
}

function obterUsuarioLocal(user) {
    return {
        id: user?.id || "",
        email: user?.email || "",
        nome: user?.user_metadata?.nome || user?.email || "Usuário",
        tipoUsuario: user?.user_metadata?.tipoUsuario || "Visitante"
    };
}

function normalizarTipoUsuario(tipo) {
    return String(tipo || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function obterDestinoPorPerfil(tipoUsuario) {
    const tipo = normalizarTipoUsuario(tipoUsuario);

    if (tipo === "administrador" || tipo === "admin") {
        return "evento-admin.html";
    }

    if (tipo === "artista") {
        return "cadastro-artista.html";
    }

    return "index.html";
}


function traduzirErroSupabase(error) {
    if (!error) return "Erro desconhecido.";

    const msg = error.message || "";

    if (msg.toLowerCase().includes("invalid api key")) {
        return "Erro: chave API do Supabase inválida. Troque a SUPABASE_ANON_KEY no auth.js pela chave anon/public correta do seu projeto.";
    }

    if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("already been registered")) {
        return "Este e-mail já está cadastrado. Tente fazer login.";
    }

    if (msg.toLowerCase().includes("email not confirmed")) {
        return "Confirme seu e-mail antes de fazer login.";
    }

    if (msg.toLowerCase().includes("invalid login credentials")) {
        return "E-mail ou senha incorretos.";
    }

    return `Erro: ${msg}`;
}

async function cadastrarUsuario(event) {
    event.preventDefault();

    const mensagem = document.getElementById("mensagemCadastro");

    if (!supabaseClient) {
        mostrarMensagem(mensagem, "Erro: Supabase não carregou. Verifique a CDN no HTML.", "error");
        return;
    }

    if (SUPABASE_ANON_KEY.includes("COLE_AQUI")) {
        mostrarMensagem(mensagem, "Antes de cadastrar, cole a chave anon/public real do Supabase no auth.js.", "error");
        return;
    }

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value;
    const confirmarSenha = document.getElementById("confirmarSenha")?.value;
    const tipoUsuario = document.getElementById("tipoUsuario")?.value;

    if (!nome || !email || !senha || !confirmarSenha || !tipoUsuario) {
        mostrarMensagem(mensagem, "Preencha todos os campos.", "error");
        return;
    }

    if (senha !== confirmarSenha) {
        mostrarMensagem(mensagem, "As senhas não coincidem.", "error");
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem(mensagem, "A senha precisa ter pelo menos 6 caracteres.", "error");
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password: senha,
        options: {
            data: { nome, tipoUsuario }
        }
    });

    if (error) {
        mostrarMensagem(mensagem, traduzirErroSupabase(error), "error");
        return;
    }

    mostrarMensagem(
        mensagem,
        "Cadastro realizado com sucesso! Se o Supabase pedir confirmação, verifique seu e-mail antes de fazer login.",
        "success"
    );

    document.getElementById("cadastroForm")?.reset();
}

async function fazerLogin(event) {
    event.preventDefault();

    const mensagem = document.getElementById("mensagemLogin");

    if (!supabaseClient) {
        mostrarMensagem(mensagem, "Erro: Supabase não carregou. Verifique a CDN no HTML.", "error");
        return;
    }

    if (SUPABASE_ANON_KEY.includes("COLE_AQUI")) {
        mostrarMensagem(mensagem, "Antes de entrar, cole a chave anon/public real do Supabase no auth.js.", "error");
        return;
    }

    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value;

    if (!email || !senha) {
        mostrarMensagem(mensagem, "Digite e-mail e senha.", "error");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password: senha
    });

    if (error) {
        mostrarMensagem(mensagem, traduzirErroSupabase(error), "error");
        return;
    }

    const usuario = obterUsuarioLocal(data.user);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        sessionStorage.setItem("portalSessaoAtiva", "sim");

    mostrarMensagem(mensagem, `Bem-vindo(a), ${usuario.nome}! Perfil: ${usuario.tipoUsuario}. Redirecionando...`, "success");

    setTimeout(() => {
        window.location.href = obterDestinoPorPerfil(usuario.tipoUsuario);
    }, 1200);
}

async function verificarUsuarioLogado() {
    if (!supabaseClient) return;

    const { data: { session } } = await supabaseClient.auth.getSession();
    const areaUsuario = document.getElementById("areaUsuario");

    if (!areaUsuario || !session?.user) return;

    const usuario = obterUsuarioLocal(session.user);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        sessionStorage.setItem("portalSessaoAtiva", "sim");

    areaUsuario.innerHTML = `
        <div class="user-box">
            <strong>Usuário logado:</strong> ${usuario.nome}<br>
            <strong>Perfil:</strong> ${usuario.tipoUsuario}<br>
            <button onclick="sair()" class="btn-logout">Sair</button>
        </div>
    `;
}

async function sair() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }

    localStorage.removeItem("usuarioLogado");
    sessionStorage.removeItem("portalSessaoAtiva");

    const paginaRestrita = location.pathname.includes("evento-admin") || location.pathname.includes("cadastro-artista");
    window.location.href = paginaRestrita ? "index.html" : location.pathname.split("/").pop() || "index.html";
}

async function mostrarBoasVindas() {
    if (!supabaseClient) return;

    const { data: { session } } = await supabaseClient.auth.getSession();
    const area = document.getElementById("boasVindas");

    if (!area || !session?.user) return;

    const usuario = obterUsuarioLocal(session.user);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        sessionStorage.setItem("portalSessaoAtiva", "sim");

    area.innerHTML = `
        <div class="welcome-box">
            <h3>Bem-vindo(a), ${usuario.nome}!</h3>
            <p>Perfil: ${usuario.tipoUsuario}</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", async () => {
    const cadastroForm = document.getElementById("cadastroForm");
    const loginForm = document.getElementById("loginForm");

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", cadastrarUsuario);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", fazerLogin);
    }

    await verificarUsuarioLogado();
    await mostrarBoasVindas();
});


function limparSessaoPortal() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("supabase.auth.token");
    sessionStorage.clear();

    Object.keys(localStorage).forEach((chave) => {
        const nome = chave.toLowerCase();
        if (
            nome.includes("supabase") ||
            nome.includes("auth-token") ||
            nome.includes("sb-") ||
            nome.includes("usuario")
        ) {
            localStorage.removeItem(chave);
        }
    });
}

async function sairDoPortal() {
    try {
        if (window.supabaseClient && window.supabaseClient.auth) {
            await window.supabaseClient.auth.signOut();
        }
    } catch (erro) {
        console.warn("Não foi possível encerrar a sessão no Supabase, limpando sessão local.", erro);
    }

    limparSessaoPortal();
    const paginaRestrita = location.pathname.includes("evento-admin") || location.pathname.includes("cadastro-artista");
    window.location.replace(paginaRestrita ? "index.html" : (location.pathname.split("/").pop() || "index.html"));
}
