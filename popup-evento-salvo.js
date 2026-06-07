
(function () {
    function campoPreenchido(id) {
        const campo = document.getElementById(id);
        return campo && String(campo.value || "").trim().length > 0;
    }

    function formularioEventoValido() {
        return [
            "nomeEvento",
            "categoriaEvento",
            "dataEvento",
            "horarioEvento",
            "localEvento",
            "descricaoEvento"
        ].every(campoPreenchido);
    }

    function criarPopupEventoSalvoFinal() {
        let popup = document.getElementById("popupEventoSalvoFinal");

        if (popup) return popup;

        popup = document.createElement("div");
        popup.id = "popupEventoSalvoFinal";
        popup.className = "popup-evento-salvo-final";
        popup.innerHTML = `
            <div class="popup-evento-salvo-final-card">
                <strong>Evento salvo com sucesso!</strong>
                <p>O evento foi adicionado à Home e ao controle administrativo.</p>
                <button type="button" id="fecharPopupEventoSalvoFinal">OK</button>
            </div>
        `;

        document.body.appendChild(popup);

        popup.addEventListener("click", function (event) {
            if (
                event.target.id === "popupEventoSalvoFinal" ||
                event.target.id === "fecharPopupEventoSalvoFinal"
            ) {
                popup.classList.remove("mostrar");
            }
        });

        return popup;
    }

    function mostrarPopupEventoSalvoFinal() {
        const popup = criarPopupEventoSalvoFinal();

        popup.classList.add("mostrar");

        clearTimeout(window.__timerPopupEventoSalvoFinal);

        window.__timerPopupEventoSalvoFinal = setTimeout(function () {
            popup.classList.remove("mostrar");
        }, 3500);
    }

    function observarMudancaNosEventosAdmin() {
        const antes = localStorage.getItem("eventosAdmin") || "";

        setTimeout(function () {
            const depois = localStorage.getItem("eventosAdmin") || "";

            if (formularioEventoValido() && antes !== depois) {
                mostrarPopupEventoSalvoFinal();
            }
        }, 500);
    }

    document.addEventListener("click", function (event) {
        const botaoSalvar = event.target.closest(".btn-event-save, button[type='submit']");

        if (!botaoSalvar) return;

        const form = botaoSalvar.closest("#eventoForm");

        if (!form) return;

        observarMudancaNosEventosAdmin();
    }, true);

    document.addEventListener("submit", function (event) {
        if (!event.target || event.target.id !== "eventoForm") return;

        observarMudancaNosEventosAdmin();
    }, true);
})();
