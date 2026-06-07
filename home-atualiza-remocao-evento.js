
(function () {
    function normalizarTextoHomeRemocao(texto) {
        return String(texto || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function encontrarCasaProgramacaoRemocao(nomeCasa) {
        if (typeof EVENTOS_POR_CASA === "undefined") return null;

        const alvo = normalizarTextoHomeRemocao(nomeCasa);

        return Object.keys(EVENTOS_POR_CASA).find(casa => {
            const casaNormalizada = normalizarTextoHomeRemocao(casa);

            return (
                casaNormalizada === alvo ||
                casaNormalizada.includes(alvo) ||
                alvo.includes(casaNormalizada)
            );
        }) || null;
    }

    function obterRemovidosHomeRemocao(casa) {
        const removidos = JSON.parse(localStorage.getItem("eventosProgramacaoRemovidos") || "{}");
        return removidos[casa] || [];
    }

    function obterEventosAdminHomeRemocao(casa, tipoFiltro) {
        const eventosAdmin = JSON.parse(localStorage.getItem("eventosAdmin") || "[]");
        const casaNormalizada = normalizarTextoHomeRemocao(casa);

        if (!Array.isArray(eventosAdmin)) return [];

        return eventosAdmin
            .filter(evento => {
                const tipoBase = String(evento.tipo || evento.periodicidade || "semanal").toLowerCase();
                const tipo = tipoBase.includes("mensal") ? "mensal" : "semanal";

                const local = evento.local || evento.localEvento || evento.casa || evento.unidade || "";
                const localNormalizado = normalizarTextoHomeRemocao(local);

                const bateCasa =
                    localNormalizado.includes(casaNormalizada) ||
                    casaNormalizada.includes(localNormalizado);

                return bateCasa && tipo === tipoFiltro;
            })
            .map(evento => {
                const tipoBase = String(evento.tipo || evento.periodicidade || "semanal").toLowerCase();
                const tipo = tipoBase.includes("mensal") ? "mensal" : "semanal";

                return {
                    ...evento,
                    tipo,
                    periodicidade: tipo === "mensal" ? "Mensal" : "Semanal",
                    titulo: evento.titulo || evento.nome || "Evento cultural",
                    nome: evento.nome || evento.titulo || "Evento cultural",
                    categoria: evento.categoria || "EVENTO",
                    data: evento.data || evento.dataEvento || "",
                    horario: evento.horario || evento.hora || "",
                    hora: evento.hora || evento.horario || "",
                    local: evento.local || evento.localEvento || casa,
                    origem: "admin"
                };
            });
    }

    function aplicarAtualizacaoHomeRemocao() {
        if (typeof obterEventosCasaSelecionada !== "function") return;

        obterEventosCasaSelecionada = function () {
            if (!casaSelecionadaHome) return [];

            const tipo = tipoEventoHome || "semanal";
            const eventosAdmin = obterEventosAdminHomeRemocao(casaSelecionadaHome, tipo);

            let eventosFixos = [];

            if (typeof EVENTOS_POR_CASA !== "undefined") {
                const chave = encontrarCasaProgramacaoRemocao(casaSelecionadaHome);

                if (chave) {
                    const removidos = obterRemovidosHomeRemocao(chave);
                    const grupo = EVENTOS_POR_CASA[chave] || { semanal: [], mensal: [] };

                    eventosFixos = (grupo[tipo] || []).filter((evento, index) => {
                        const id = `${tipo}-${index}`;
                        return !removidos.includes(id);
                    });
                }
            }

            return [...eventosFixos, ...eventosAdmin];
        };

        if (typeof renderizarEventosDaCasaHome === "function") {
            renderizarEventosDaCasaHome();
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(aplicarAtualizacaoHomeRemocao, 300);
        setTimeout(aplicarAtualizacaoHomeRemocao, 900);
    });

    window.addEventListener("storage", event => {
        if (
            event.key === "eventosProgramacaoRemovidos" ||
            event.key === "eventosAdmin" ||
            event.key === "eventosPortal" ||
            event.key === "eventosCulturais" ||
            event.key === "eventos"
        ) {
            aplicarAtualizacaoHomeRemocao();
        }
    });
})();
