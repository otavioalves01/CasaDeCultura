(function () {
    const paginaLogin = location.pathname.endsWith("login.html");
    const paginaCadastro = location.pathname.endsWith("cadastro.html");
    const sessaoAtiva = sessionStorage.getItem("portalSessaoAtiva");

    if (!sessaoAtiva && !paginaLogin && !paginaCadastro) {
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("supabase.auth.token");

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
})();

document.addEventListener("DOMContentLoaded", () => {
    const sessaoAtiva = sessionStorage.getItem("portalSessaoAtiva");
    const boasVindas = document.getElementById("boasVindas");

    if (!sessaoAtiva && boasVindas) {
        boasVindas.innerHTML = "";
        boasVindas.style.display = "none";
    }
});
