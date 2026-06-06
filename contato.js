function mostrarAlerta(tipo, mensagens) {
    const alertBox = document.getElementById("alertBox");
    const alertInner = document.getElementById("alertInner");

    if (!alertBox || !alertInner) return;

    const icone = tipo === "success" ? "✅" : "⚠️";
    const texto = Array.isArray(mensagens) ? mensagens.join("<br>") : mensagens;

    alertInner.className = `alert-inner ${tipo}`;
    alertInner.innerHTML = `<span>${icone}</span><span>${texto}</span>`;
    alertBox.classList.remove("hidden");

    alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function updateChar() {
    const mensagem = document.getElementById("mensagem");
    const charHint = document.getElementById("charHint");

    if (!mensagem || !charHint) return;

    const total = mensagem.value.trim().length;
    charHint.textContent = `${total}/10 caracteres mínimos`;
    charHint.classList.toggle("valid", total >= 10);
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function aplicarMascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else if (valor.length > 0) {
        valor = valor.replace(/(\d{0,2})/, "($1");
    }

    input.value = valor;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const telefone = document.getElementById("telefone");
    const mensagem = document.getElementById("mensagem");

    if (telefone) {
        telefone.addEventListener("input", () => aplicarMascaraTelefone(telefone));
    }

    if (mensagem) {
        mensagem.addEventListener("input", updateChar);
        updateChar();
    }

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const textoMensagem = document.getElementById("mensagem").value.trim();
        const erros = [];

        if (!nome) erros.push("Nome é obrigatório.");
        if (!validarEmail(email)) erros.push("Informe um e-mail válido.");
        if (!assunto) erros.push("Selecione um assunto.");
        if (textoMensagem.length < 10) erros.push("A mensagem deve possuir no mínimo 10 caracteres.");

        if (erros.length > 0) {
            mostrarAlerta("error", erros);
            return;
        }

        mostrarAlerta("success", "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.");
        form.reset();
        updateChar();
    });
});
