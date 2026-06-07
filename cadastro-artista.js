
function mostrarMensagemArtista(tipo, mensagens, deveRolar = false) {
    const mensagem = document.getElementById("mensagemArtista");
    if (!mensagem) return;

    const lista = Array.isArray(mensagens) ? mensagens : [mensagens];

    mensagem.className = `auth-message ${tipo}`;
    mensagem.innerHTML = lista.map(item => `• ${item}`).join("<br>");
    mensagem.style.display = "block";

    if (deveRolar) {
        mensagem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

function limparErrosArtista() {
    document.querySelectorAll(".campo-invalido").forEach(campo => {
        campo.classList.remove("campo-invalido");
    });
}

function marcarCampoInvalido(id) {
    const campo = document.getElementById(id);
    if (campo) {
        campo.classList.add("campo-invalido");
    }
}

function valorCampo(id) {
    return document.getElementById(id)?.value?.trim() || "";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("artistaForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        limparErrosArtista();

        const erros = [];

        const camposObrigatorios = [
            {
                id: "nomeArtistico",
                mensagem: "Preencha o nome artístico, grupo ou projeto."
            },
            {
                id: "categoriaArtistica",
                mensagem: "Selecione a categoria artística."
            },
            {
                id: "responsavel",
                mensagem: "Preencha o nome do responsável pelo cadastro."
            },
            {
                id: "contatoArtista",
                mensagem: "Preencha um contato: e-mail, telefone, WhatsApp ou rede social."
            }
        ];

        camposObrigatorios.forEach(campo => {
            if (!valorCampo(campo.id)) {
                erros.push(campo.mensagem);
                marcarCampoInvalido(campo.id);
            }
        });

        const descricao = valorCampo("descricaoArtista");
        if (!descricao || descricao.length < 10) {
            erros.push("Descreva a proposta artística com pelo menos 10 caracteres.");
            marcarCampoInvalido("descricaoArtista");
        }

        if (erros.length > 0) {
            mostrarMensagemArtista("error", erros, true);
            return;
        }

        const cadastro = {
            id: Date.now(),
            nomeArtistico: valorCampo("nomeArtistico"),
            categoriaArtistica: valorCampo("categoriaArtistica"),
            responsavel: valorCampo("responsavel"),
            contatoArtista: valorCampo("contatoArtista"),
            localInteresse: valorCampo("localInteresse"),
            descricaoArtista: descricao,
            dataCadastro: new Date().toLocaleString("pt-BR")
        };

        const cadastros = JSON.parse(localStorage.getItem("cadastrosArtistas") || "[]");
        cadastros.push(cadastro);
        localStorage.setItem("cadastrosArtistas", JSON.stringify(cadastros));

        mostrarMensagemArtista("success", "Cadastro enviado com sucesso!");
        form.reset();
    });
});
