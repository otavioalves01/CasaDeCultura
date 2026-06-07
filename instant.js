
function limparSessaoPortalInstant() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("supabase.auth.token");
    sessionStorage.removeItem("portalSessaoAtiva");
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

async function sairInstant() {
    try {
        if (window.supabaseClient && window.supabaseClient.auth) {
            await window.supabaseClient.auth.signOut();
        }
    } catch (erro) {
        console.warn("Sessão Supabase não finalizada, limpando localmente.", erro);
    }

    limparSessaoPortalInstant();

    const boasVindas = document.getElementById("boasVindas");
    if (boasVindas) boasVindas.innerHTML = "";

    const paginaRestrita = location.pathname.includes("evento-admin") || location.pathname.includes("cadastro-artista");
    window.location.replace(paginaRestrita ? "index.html" : (location.pathname.split("/").pop() || "index.html"));
}

document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    const navLinks = document.querySelector(".nav-links");
    const boasVindas = document.getElementById("boasVindas");

    if (!usuario && boasVindas) {
        boasVindas.innerHTML = "";
    }

    if (!navLinks || !usuario) return;

    const loginLink = navLinks.querySelector('a[href="login.html"]');
    const cadastroLink = navLinks.querySelector('a[href="cadastro.html"]');

    if (loginLink) loginLink.remove();
    if (cadastroLink) cadastroLink.remove();

    if (!document.getElementById("btnSairInstant")) {
        const sair = document.createElement("a");
        sair.href = "#";
        sair.id = "btnSairInstant";
        sair.textContent = "Sair";

        sair.addEventListener("click", function (event) {
            event.preventDefault();
            sairInstant();
        });

        navLinks.appendChild(sair);
    }
});
