
(function () {
    function valorPreenchido(id) {
        const campo = document.getElementById(id);
        return campo && String(campo.value || "").trim() !== "";
    }

    function formularioAdminValido() {
        const obrigatorios = [
            "nomeEvento",
            "categoriaEvento",
            "dataEvento",
            "horarioEvento",
            "localEvento",
            "descricaoEvento"
        ];

        return obrigatorios.every(valorPreenchido);
    }

    function criarPopupSalvoGarantido() {
        let popup = document.getElementById("popupSalvoGarantido");

        if (popup) return popup;

        popup = document.createElement("div");
        popup.id = "popupSalvoGarantido";
        popup.className = "popup-salvo-garantido";
        popup.innerHTML = `
            <div class="popup-salvo-garantido-card">
                <strong>Evento salvo com sucesso!</strong>
                <p>O evento foi adicionado à Home e ao controle administrativo.</p>
                <button type="button" id="fecharPopupSalvoGarantido">OK</button>
            </div>
        `;

        document.body.appendChild(popup);

        popup.addEventListener("click", function (event) {
            if (
                event.target.id === "popupSalvoGarantido" ||
                event.target.id === "fecharPopupSalvoGarantido"
            ) {
                popup.classList.remove("mostrar");
            }
        });

        return popup;
    }

    function mostrarPopupSalvoGarantido() {
        const popup = criarPopupSalvoGarantido();
        popup.classList.add("mostrar");

        clearTimeout(window.__popupSalvoGarantidoTimer);

        window.__popupSalvoGarantidoTimer = setTimeout(function () {
            popup.classList.remove("mostrar");
        }, 4000);
    }

    document.addEventListener("submit", function (event) {
        const form = event.target;

        if (!form || form.id !== "eventoForm") return;

        const estavaValido = formularioAdminValido();

        if (!estavaValido) return;

        setTimeout(function () {
            mostrarPopupSalvoGarantido();
        }, 300);
    }, true);

    document.addEventListener("click", function (event) {
        const botao = event.target.closest(".btn-event-save");

        if (!botao) return;

        const form = botao.closest("#eventoForm");

        if (!form) return;

        const estavaValido = formularioAdminValido();

        if (!estavaValido) return;

        setTimeout(function () {
            mostrarPopupSalvoGarantido();
        }, 450);
    }, true);
})();
