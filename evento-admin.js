

function mostrarAvisoFixoAdmin(texto) {
    let aviso = document.getElementById("avisoFixoAdmin");

    if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "avisoFixoAdmin";
        aviso.className = "aviso-fixo-admin";
        document.body.appendChild(aviso);
    }

    aviso.innerHTML = `
        <strong>⚠️ Atenção</strong>
        <span>${texto}</span>
    `;

    aviso.classList.add("mostrar");

    const mensagemEvento = document.getElementById("mensagemEvento");
    if (mensagemEvento) {
        mensagemEvento.textContent = texto;
        mensagemEvento.className = "auth-message error";
        mensagemEvento.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {
        aviso.classList.remove("mostrar");
    }, 5000);
}

function validarEventoAdminObrigatorio() {
    const campos = [
        { id: "nomeEvento", nome: "Nome do evento" },
        { id: "categoriaEvento", nome: "Categoria" },
        { id: "dataEvento", nome: "Data do evento" },
        { id: "horarioEvento", nome: "Horário do evento" },
        { id: "localEvento", nome: "Local" },
        { id: "descricaoEvento", nome: "Descrição" }
    ];

    document.querySelectorAll(".campo-invalido-admin").forEach(campo => {
        campo.classList.remove("campo-invalido-admin");
    });

    const faltando = [];

    campos.forEach(item => {
        const campo = document.getElementById(item.id);

        if (campo && !String(campo.value || "").trim()) {
            faltando.push(item.nome);
            campo.classList.add("campo-invalido-admin");
        }
    });

    if (faltando.length > 0) {
        mostrarAvisoFixoAdmin("Preencha os campos obrigatórios: " + faltando.join(", ") + ".");
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const formAdmin = document.getElementById("eventoForm");

    if (formAdmin && !formAdmin.dataset.validacaoFixaAplicada) {
        formAdmin.dataset.validacaoFixaAplicada = "true";

        formAdmin.addEventListener("submit", (event) => {
            if (!validarEventoAdminObrigatorio()) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
            }
        }, true);
    }
});


function rolarParaMensagemEvento() {
    const mensagemEvento = document.getElementById("mensagemEvento");
    if (!mensagemEvento) return;

    mensagemEvento.style.display = "block";

    setTimeout(() => {
        mensagemEvento.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 80);
}


function mostrarMensagemEvento(tipo, texto, deveRolar = false) {
    const mensagem = document.getElementById("mensagemEvento");
    if (!mensagem) return;

    mensagem.textContent = texto;
    mensagem.className = `auth-message ${tipo}`;
    mensagem.style.display = "block";

    if (deveRolar) {
    }
}


function manterPosicaoAoRemover(callback) {
    const posicaoAtual = window.scrollY || document.documentElement.scrollTop;

    if (typeof callback === "function") {
        callback();
    }

    requestAnimationFrame(() => {
        window.scrollTo({
            top: posicaoAtual,
            left: 0,
            behavior: "auto"
        });
    });
}


function limparSessaoAdmin() {
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

const CASAS_CULTURA_ADMIN = [
    "Brasilândia",
    "Butantã",
    "Campo Limpo",
    "Chico Science (Ipiranga)",
    "Freguesia do Ó",
    "Guaianases",
    "Hip Hop Leste",
    "Hip Hop Sul",
    "Itaim Paulista",
    "Itaquera (Raul Seixas)",
    "M'Boi Mirim",
    "Parelheiros",
    "Santo Amaro (Júlio Guerra)",
    "Santo Amaro (Manoel Cardoso)",
    "São Mateus",
    "São Miguel Paulista",
    "São Rafael",
    "Tremembé",
    "Vila Guilherme (Casarão)"
];

const EVENTOS_PADRAO_ADMIN = [];

function gerarEventosPadraoAdmin() {
    if (typeof EVENTOS_POR_CASA === "undefined" || !EVENTOS_POR_CASA) return [];

    const lista = [];

    Object.entries(EVENTOS_POR_CASA).forEach(([casa, grupos]) => {
        ["semanal", "mensal"].forEach((tipo) => {
            const eventos = grupos?.[tipo] || [];

            eventos.forEach((evento, indice) => {
                const baseId = [casa, tipo, indice, evento.titulo || evento.nome || "evento"]
                    .join("-")
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");

                lista.push(normalizarEvento({
                    ...evento,
                    id: `padrao-${baseId}`,
                    tipo,
                    periodicidade: tipo === "mensal" ? "Mensal" : "Semanal",
                    local: evento.local || casa,
                    origem: "padrao"
                }));
            });
        });
    });

    return lista;
}


function lerJSON(chave, fallback) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || fallback;
    } catch {
        return fallback;
    }
}

function salvarJSON(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function normalizarEvento(evento) {
    const tipo = (evento.tipo || evento.periodicidade || "Semanal").toString().toLowerCase();
    return {
        ...evento,
        id: evento.id || `evento-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        tipo: tipo.includes("mensal") ? "mensal" : "semanal",
        periodicidade: tipo.includes("mensal") ? "Mensal" : "Semanal",
        titulo: evento.titulo || evento.nome || "Evento sem nome",
        nome: evento.nome || evento.titulo || "Evento sem nome",
        hora: evento.hora || evento.horario || "",
        horario: evento.horario || evento.hora || "",
        origem: evento.origem || "admin"
    };
}

function obterEventosAdmin() {
    const personalizados = lerJSON("eventosAdmin", []).map(normalizarEvento);
    const removidos = lerJSON("eventosRemovidosAdmin", []);
    return [...EVENTOS_PADRAO_ADMIN, ...gerarEventosPadraoAdmin(), ...personalizados]
        .map(normalizarEvento)
        .filter(evento => !removidos.includes(evento.id));
}

function formatarDataInput(dataISO) {
    if (!dataISO) return "";
    const partes = dataISO.split("-");
    if (partes.length !== 3) return dataISO;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function mostrarMensagemAdmin(texto, tipo = "success") {
    const mensagem = document.getElementById("mensagemEvento");
    if (!mensagem) return;
    mensagem.textContent = texto;
    mensagem.className = `auth-message ${tipo}`;
}

function renderizarListaAdmin(filtro = "todos") {
    const lista = document.getElementById("listaEventosAdmin");
    if (!lista) return;

    const eventos = obterEventosAdmin().filter(evento => {
        if (filtro === "todos") return true;
        return evento.tipo === filtro;
    });

    if (!eventos.length) {
        lista.innerHTML = `<div class="admin-empty">Nenhum evento encontrado nesta categoria.</div>`;
        return;
    }

    lista.innerHTML = eventos.map(evento => `
        <article class="admin-event-card">
            <div class="admin-event-info">
                <span class="admin-event-badge ${evento.tipo}">${evento.periodicidade}</span>
                <h3>${evento.titulo}</h3>
                <p>${evento.categoria || "Sem categoria"}</p>
                <div class="admin-event-meta">
                    <span>📅 ${evento.data || "Data não informada"}</span>
                    <span>⏰ ${evento.hora || "Horário não informado"}</span>
                    ${evento.local ? `<span>📍 ${evento.local}</span>` : ""}
                </div>
            </div>
            <button type="button" class="btn-delete-event" data-id="${evento.id}">
                Apagar
            </button>
        </article>
    `).join("");

    lista.querySelectorAll(".btn-delete-event").forEach(botao => {
        botao.addEventListener("click", () => {
            const id = botao.getAttribute("data-id");
            apagarEvento(id);
        });
    });
}

function apagarEvento(id) {
    const personalizados = lerJSON("eventosAdmin", []);
    const existePersonalizado = personalizados.some(evento => evento.id === id);

    if (existePersonalizado) {
        salvarJSON("eventosAdmin", personalizados.filter(evento => evento.id !== id));
    } else {
        const removidos = lerJSON("eventosRemovidosAdmin", []);
        if (!removidos.includes(id)) {
            removidos.push(id);
            salvarJSON("eventosRemovidosAdmin", removidos);
        }
    }

    renderizarListaAdmin(document.querySelector(".admin-filter.active")?.dataset.adminFilter || "todos");
    mostrarMensagemAdmin("Evento apagado com sucesso. A Home já foi atualizada.", "success");
}


function preencherLocaisAdmin() {
    const selectLocal = document.getElementById("localEvento");
    if (!selectLocal) return;

    const valorAtual = selectLocal.value;
    selectLocal.innerHTML = '<option value="">Selecione a Casa de Cultura</option>';

    CASAS_CULTURA_ADMIN.forEach(local => {
        const option = document.createElement("option");
        option.value = local;
        option.textContent = local;
        selectLocal.appendChild(option);
    });

    if (valorAtual) selectLocal.value = valorAtual;
}

document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario || usuario.tipoUsuario !== "Administrador") {
        window.location.href = "index.html";
        return;
    }

    preencherLocaisAdmin();

    const form = document.getElementById("eventoForm");
    const descricao = document.getElementById("descricaoEvento");
    const contador = document.getElementById("contadorDescricao");
    const btnSair = document.getElementById("btnSairAdmin");
    const opcoesPeriodicidade = document.querySelectorAll(".periodicity-option");

    opcoesPeriodicidade.forEach(opcao => {
        opcao.addEventListener("click", () => {
            opcoesPeriodicidade.forEach(item => item.classList.remove("active"));
            opcao.classList.add("active");
            opcao.querySelector("input").checked = true;
        });
    });

    if (descricao && contador) {
        descricao.addEventListener("input", () => {
            contador.textContent = `${descricao.value.length}/1000`;
        });
    }

    if (btnSair) {
        btnSair.addEventListener("click", event => {
            event.preventDefault();
            localStorage.removeItem("usuarioLogado");
            window.location.href = "index.html";
        });
    }

    document.querySelectorAll(".admin-filter").forEach(botao => {
        botao.addEventListener("click", () => {
            document.querySelectorAll(".admin-filter").forEach(item => item.classList.remove("active"));
            botao.classList.add("active");
            renderizarListaAdmin(botao.dataset.adminFilter);
        });
    });

    const btnRestaurar = document.getElementById("btnRestaurarEventos");
    if (btnRestaurar) {
        btnRestaurar.addEventListener("click", () => {
            // RESTAURAR EVENTOS PADRÃO
            // Remove todas as listas de eventos apagados para que os eventos voltem a aparecer
            // tanto no painel administrativo quanto na Home.
            localStorage.removeItem("eventosRemovidosAdmin");
            localStorage.removeItem("eventosProgramacaoRemovidos");
            localStorage.removeItem("eventosRemovidosHome");
            localStorage.removeItem("eventosRemovidos");
            localStorage.removeItem("eventosProgramacaoRemovidos");
            localStorage.removeItem("eventosResetadosHomeVazio");

            renderizarListaAdmin(document.querySelector(".admin-filter.active")?.dataset.adminFilter || "todos");

            if (typeof aplicarFiltroAdminFinal === "function") {
                aplicarFiltroAdminFinal();
            }

            mostrarMensagemAdmin("Eventos padrões restaurados com sucesso.", "success");
        });
    }

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const nome = document.getElementById("nomeEvento").value.trim();
            const categoria = document.getElementById("categoriaEvento").value;
            const dataInput = document.getElementById("dataEvento").value;
            const horario = document.getElementById("horarioEvento").value;
            const local = document.getElementById("localEvento").value;
            const descricaoTexto = descricao.value.trim();
            const periodicidade = document.querySelector('input[name="periodicidade"]:checked').value;

            if (!nome || !categoria || !dataInput || !horario || !local || !descricaoTexto) {
                mostrarMensagemAdmin("Preencha todos os campos obrigatórios antes de salvar o evento.", "error");
                return;
            }

            const acessibilidade = Array.from(document.querySelectorAll('input[name="acessibilidade"]:checked'))
                .map(item => item.value);

            const evento = normalizarEvento({
                id: `admin-${Date.now()}`,
                periodicidade,
                tipo: periodicidade.toLowerCase(),
                titulo: nome,
                nome,
                categoria,
                data: formatarDataInput(dataInput),
                hora: horario,
                horario,
                local,
                descricao: descricaoTexto,
                acessibilidade,
                outrosAcessibilidade: document.getElementById("outrosAcessibilidade").value.trim(),
                criadoPor: usuario.email,
                criadoEm: new Date().toISOString(),
                origem: "admin"
            });

            const eventosAdmin = lerJSON("eventosAdmin", []);
            eventosAdmin.push(evento);
            salvarJSON("eventosAdmin", eventosAdmin);

            form.reset();
            contador.textContent = "0/1000";
            opcoesPeriodicidade.forEach(item => item.classList.remove("active"));
            opcoesPeriodicidade[0].classList.add("active");
            opcoesPeriodicidade[0].querySelector("input").checked = true;

            renderizarListaAdmin(document.querySelector(".admin-filter.active")?.dataset.adminFilter || "todos");
            mostrarMensagemAdmin("Evento salvo com sucesso. Ele já aparece na Home.", "success");
        });
    }

    renderizarListaAdmin("todos");
});












document.addEventListener("click", (event) => {
    const texto = (event.target.textContent || "").toLowerCase();
    const botaoRemover = event.target.closest(".btn-excluir-evento, .btn-remover-evento, [data-remover-evento], [data-action='remover'], [data-action='excluir']")
        || (texto.includes("excluir") || texto.includes("remover") || texto.includes("apagar") ? event.target.closest("button, a") : null);

    if (!botaoRemover) return;

    const posicaoAtual = window.scrollY || document.documentElement.scrollTop || 0;

    setTimeout(() => {
        window.scrollTo({
            top: posicaoAtual,
            left: 0,
            behavior: "auto"
        });
    }, 50);
}, true);



function normalizarAdminCasa(texto) {
    return String(texto || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function eventoEhJunhoAdmin(evento) {
    const texto = [
        evento?.data,
        evento?.dataEvento,
        evento?.horario,
        evento?.hora,
        evento?.titulo,
        evento?.nome,
        evento?.descricao
    ].map(valor => String(valor || "")).join(" ").toLowerCase();

    if (texto.includes("teste")) return false;
    if (texto.includes("maio") || texto.includes("/05") || texto.includes(".05") || texto.includes("-05-")) return false;

    return true;
}

function limparEventosAntigosAdmin() {
    ["eventosPortal", "eventosCulturais", "eventos"].forEach(chave => {
        const eventos = JSON.parse(localStorage.getItem(chave) || "[]");

        if (!Array.isArray(eventos)) return;

        localStorage.setItem(chave, JSON.stringify(eventos.filter(eventoEhJunhoAdmin)));
    });
}

function obterCasasAdminFiltro() {
    if (typeof EVENTOS_POR_CASA !== "undefined") {
        return Object.keys(EVENTOS_POR_CASA);
    }

    if (typeof CASAS_CULTURA_ADMIN !== "undefined" && Array.isArray(CASAS_CULTURA_ADMIN)) {
        return CASAS_CULTURA_ADMIN;
    }

    return [];
}

function obterEventosFixosPorCasaAdmin(casa) {
    if (!casa || typeof EVENTOS_POR_CASA === "undefined") return [];

    const chave = Object.keys(EVENTOS_POR_CASA).find(nome => {
        const a = normalizarAdminCasa(nome);
        const b = normalizarAdminCasa(casa);
        return a === b || a.includes(b) || b.includes(a);
    });

    if (!chave) return [];

    const grupo = EVENTOS_POR_CASA[chave] || {};

    return [
        ...(grupo.semanal || []).map(evento => ({ ...evento, tipo: "semanal", origem: "programacao" })),
        ...(grupo.mensal || []).map(evento => ({ ...evento, tipo: "mensal", origem: "programacao" }))
    ];
}

function obterEventosSalvosPorCasaAdmin(casa) {
    const todos = [];

    ["eventosPortal", "eventosCulturais", "eventos"].forEach(chave => {
        const eventos = JSON.parse(localStorage.getItem(chave) || "[]");

        if (!Array.isArray(eventos)) return;

        eventos.forEach((evento, index) => {
            if (!eventoEhJunhoAdmin(evento)) return;

            const local = evento.local || evento.localEvento || evento.casa || evento.unidade || "";

            if (!casa || normalizarAdminCasa(local).includes(normalizarAdminCasa(casa)) || normalizarAdminCasa(casa).includes(normalizarAdminCasa(local))) {
                todos.push({ ...evento, __chaveOrigem: chave, __indexOrigem: index, origem: "localStorage" });
            }
        });
    });

    return todos;
}

function criarFiltroCasaAdminDentroDaSecao() {
    if (document.getElementById("filtroCasaEventosAdmin")) return;

    const secaoEventos = Array.from(document.querySelectorAll("section, .admin-panel, .admin-events-panel, .eventos-cadastrados"))
        .find(el => /eventos cadastrados/i.test(el.textContent || ""));

    const alvo = secaoEventos || document.querySelector(".admin-panel") || document.body;

    const bloco = document.createElement("div");
    bloco.className = "admin-filtro-casa-eventos-inline";
    bloco.innerHTML = `
        <label for="filtroCasaEventosAdmin">Filtrar eventos por Casa de Cultura</label>
        <select id="filtroCasaEventosAdmin">
            <option value="">Selecione uma Casa de Cultura</option>
            ${obterCasasAdminFiltro().map(casa => `<option value="${casa}">${casa}</option>`).join("")}
        </select>
        <p>Escolha uma unidade para visualizar e apagar os eventos dessa casa.</p>
    `;

    const tabs = alvo.querySelector(".admin-event-tabs, .tabs, .event-tabs");
    if (tabs) {
        tabs.insertAdjacentElement("beforebegin", bloco);
    } else {
        alvo.appendChild(bloco);
    }

    const lista = document.createElement("div");
    lista.id = "listaEventosFiltradosAdmin";
    lista.className = "lista-eventos-filtrados-admin";
    lista.innerHTML = `<div class="admin-sem-eventos-casa">Selecione uma Casa de Cultura para visualizar os eventos disponíveis.</div>`;
    bloco.insertAdjacentElement("afterend", lista);

    document.getElementById("filtroCasaEventosAdmin").addEventListener("change", aplicarFiltroCasaAdmin);
}

function aplicarFiltroCasaAdmin() {
    const select = document.getElementById("filtroCasaEventosAdmin");
    const casa = select?.value || "";
    const lista = document.getElementById("listaEventosFiltradosAdmin");

    if (!lista) return;

    if (!casa) {
        lista.innerHTML = `<div class="admin-sem-eventos-casa">Selecione uma Casa de Cultura para visualizar os eventos disponíveis.</div>`;
        return;
    }

    const eventos = [
        ...obterEventosFixosPorCasaAdmin(casa),
        ...obterEventosSalvosPorCasaAdmin(casa)
    ];

    if (!eventos.length) {
        lista.innerHTML = `<div class="admin-sem-eventos-casa">Nenhum evento encontrado para esta Casa de Cultura.</div>`;
        return;
    }

    lista.innerHTML = eventos.map((evento, index) => `
        <article class="admin-evento-filtrado-card">
            <div>
                <span>${evento.categoria || "EVENTO"}</span>
                <h3>${evento.titulo || evento.nome || "Evento cultural"}</h3>
                <p><strong>Tipo:</strong> ${evento.tipo || evento.periodicidade || "mensal"}</p>
                <p><strong>Casa:</strong> ${evento.local || evento.localEvento || casa}</p>
                <p><strong>Data/Horário:</strong> ${[evento.data || evento.dataEvento, evento.hora || evento.horario].filter(Boolean).join(" | ") || "Não informado"}</p>
            </div>
            <button type="button"
                class="btn-apagar-filtrado-admin"
                data-index="${index}"
                data-chave="${evento.__chaveOrigem || ""}"
                data-index-origem="${evento.__indexOrigem ?? ""}"
                data-origem="${evento.origem || "programacao"}">
                Apagar
            </button>
        </article>
    `).join("");

    lista.querySelectorAll(".btn-apagar-filtrado-admin").forEach(botao => {
        botao.addEventListener("click", () => {
            const posicaoAtual = window.scrollY || document.documentElement.scrollTop || 0;
            const origem = botao.dataset.origem;

            if (origem === "localStorage") {
                const chave = botao.dataset.chave;
                const indexOrigem = Number(botao.dataset.indexOrigem);
                const eventosChave = JSON.parse(localStorage.getItem(chave) || "[]");

                if (Array.isArray(eventosChave) && eventosChave[indexOrigem]) {
                    eventosChave.splice(indexOrigem, 1);
                    localStorage.setItem(chave, JSON.stringify(eventosChave));
                }
            } else {
                const casaAtual = document.getElementById("filtroCasaEventosAdmin")?.value || "";
                const index = Number(botao.dataset.index);
                const removidos = JSON.parse(localStorage.getItem("eventosProgramacaoRemovidos") || "{}");
                removidos[casaAtual] = removidos[casaAtual] || [];
                removidos[casaAtual].push(index);
                localStorage.setItem("eventosProgramacaoRemovidos", JSON.stringify(removidos));
            }

            aplicarFiltroCasaAdmin();

            requestAnimationFrame(() => {
                window.scrollTo(0, posicaoAtual);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    limparEventosAntigosAdmin();

    setTimeout(() => {
        criarFiltroCasaAdminDentroDaSecao();
        aplicarFiltroCasaAdmin();
    }, 450);
});


function normalizarAdminFinal(texto) {
    return String(texto || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function obterTipoEventoAdminFinal(evento) {
    return normalizarAdminFinal(evento.tipo || evento.periodicidade || evento.frequencia || "mensal");
}

function obterCasasAdminFinal() {
    if (typeof EVENTOS_POR_CASA !== "undefined") {
        return Object.keys(EVENTOS_POR_CASA);
    }

    if (typeof CASAS_CULTURA_ADMIN !== "undefined" && Array.isArray(CASAS_CULTURA_ADMIN)) {
        return CASAS_CULTURA_ADMIN;
    }

    return [
        "Brasilândia",
        "Butantã",
        "Campo Limpo (Dora Nascimento)",
        "Chico Science (Ipiranga)",
        "Cidade Ademar",
        "Freguesia do Ó (Salvador Ligabue)",
        "Guaianases",
        "Hip Hop Leste",
        "Hip Hop Sul",
        "Itaim Paulista",
        "Itaquera (Raul Seixas)",
        "M'Boi Mirim",
        "Parelheiros",
        "Santo Amaro (Júlio Guerra)",
        "Santo Amaro (Manoel Mendonça)",
        "São Mateus",
        "São Miguel Paulista",
        "São Rafael",
        "Tremembé",
        "Vila Guilherme (Casarão)"
    ];
}

function encontrarChaveCasaAdminFinal(casa) {
    if (typeof EVENTOS_POR_CASA === "undefined") return null;

    const alvo = normalizarAdminFinal(casa);

    return Object.keys(EVENTOS_POR_CASA).find(chave => {
        const nome = normalizarAdminFinal(chave);
        return nome === alvo || nome.includes(alvo) || alvo.includes(nome);
    }) || null;
}

function obterRemovidosProgramacaoAdminFinal(casa) {
    const removidos = JSON.parse(localStorage.getItem("eventosProgramacaoRemovidos") || "{}");
    return removidos[casa] || [];
}

function obterEventosFixosAdminFinal(casa, tipoFiltro) {
    if (!casa || typeof EVENTOS_POR_CASA === "undefined") return [];

    const chave = encontrarChaveCasaAdminFinal(casa);
    if (!chave) return [];

    const removidos = obterRemovidosProgramacaoAdminFinal(chave);
    const grupo = EVENTOS_POR_CASA[chave] || {};
    const eventos = [];

    if (tipoFiltro === "todos" || tipoFiltro === "semanal") {
        (grupo.semanal || []).forEach((evento, index) => {
            const id = `semanal-${index}`;
            if (!removidos.includes(id)) {
                eventos.push({
                    ...evento,
                    tipo: "semanal",
                    origem: "programacao",
                    __idProgramacao: id,
                    __casaProgramacao: chave
                });
            }
        });
    }

    if (tipoFiltro === "todos" || tipoFiltro === "mensal") {
        (grupo.mensal || []).forEach((evento, index) => {
            const id = `mensal-${index}`;
            if (!removidos.includes(id)) {
                eventos.push({
                    ...evento,
                    tipo: "mensal",
                    origem: "programacao",
                    __idProgramacao: id,
                    __casaProgramacao: chave
                });
            }
        });
    }

    return eventos;
}

function eventoLocalStorageEhValidoAdminFinal(evento) {
    const texto = [
        evento?.data,
        evento?.dataEvento,
        evento?.horario,
        evento?.hora,
        evento?.titulo,
        evento?.nome,
        evento?.descricao
    ].map(valor => String(valor || "")).join(" ").toLowerCase();

    if (texto.includes("teste")) return false;
    if (texto.includes("maio") || texto.includes("/05") || texto.includes(".05") || texto.includes("-05-")) return false;

    return true;
}

function limparEventosAntigosAdminFinal() {
    ["eventosPortal", "eventosCulturais", "eventos"].forEach(chave => {
        const eventos = JSON.parse(localStorage.getItem(chave) || "[]");
        if (!Array.isArray(eventos)) return;

        const filtrados = eventos.filter(eventoLocalStorageEhValidoAdminFinal);
        localStorage.setItem(chave, JSON.stringify(filtrados));
    });
}

function obterEventosSalvosAdminFinal(casa, tipoFiltro) {
    const todos = [];
    const casaNormalizada = normalizarAdminFinal(casa);

    ["eventosPortal", "eventosCulturais", "eventos"].forEach(chave => {
        const eventos = JSON.parse(localStorage.getItem(chave) || "[]");

        if (!Array.isArray(eventos)) return;

        eventos.forEach((evento, index) => {
            if (!eventoLocalStorageEhValidoAdminFinal(evento)) return;

            const local = evento.local || evento.localEvento || evento.casa || evento.unidade || "";
            const tipo = obterTipoEventoAdminFinal(evento);

            const bateCasa = !casa || normalizarAdminFinal(local).includes(casaNormalizada) || casaNormalizada.includes(normalizarAdminFinal(local));
            const bateTipo = tipoFiltro === "todos" || tipo === tipoFiltro;

            if (bateCasa && bateTipo) {
                todos.push({
                    ...evento,
                    tipo,
                    origem: "localStorage",
                    __chaveOrigem: chave,
                    __indexOrigem: index
                });
            }
        });
    });

    return todos;
}

function criarFiltroAdminFinal() {
    const secaoEventos = Array.from(document.querySelectorAll("section, .admin-panel, .admin-events-panel, .eventos-cadastrados, div"))
        .find(el => /eventos cadastrados/i.test(el.textContent || ""));

    const alvo = secaoEventos || document.querySelector(".admin-panel") || document.body;

    document.querySelectorAll(".admin-filtro-casa-eventos, .admin-filtro-casa-eventos-inline, #listaEventosFiltradosAdmin").forEach(el => el.remove());

    const bloco = document.createElement("div");
    bloco.className = "admin-filtro-casa-eventos-final";
    bloco.innerHTML = `
        <div class="admin-filtro-casa-linha">
            <div class="admin-filtro-casa-campo">
                <label for="filtroCasaEventosAdmin">Casa de Cultura</label>
                <select id="filtroCasaEventosAdmin">
                    <option value="">Selecione uma Casa de Cultura</option>
                    ${obterCasasAdminFinal().map(casa => `<option value="${casa}">${casa}</option>`).join("")}
                </select>
            </div>

            <div class="admin-filtro-tipo-campo">
                <span>Tipo de evento</span>
                <div class="admin-tabs-filtro-eventos">
                    <button type="button" class="active" data-tipo-admin="todos">Todos</button>
                    <button type="button" data-tipo-admin="semanal">Semanal</button>
                    <button type="button" data-tipo-admin="mensal">Mensal</button>
                </div>
            </div>
        </div>
    `;

    const tabsAntigas = alvo.querySelector(".tabs, .admin-event-tabs, .event-tabs");
    if (tabsAntigas) {
        tabsAntigas.insertAdjacentElement("beforebegin", bloco);
    } else {
        alvo.appendChild(bloco);
    }

    const lista = document.createElement("div");
    lista.id = "listaEventosFiltradosAdmin";
    lista.className = "lista-eventos-filtrados-admin";
    lista.innerHTML = `<div class="admin-sem-eventos-casa">Selecione uma Casa de Cultura para visualizar os eventos disponíveis.</div>`;
    bloco.insertAdjacentElement("afterend", lista);

    document.getElementById("filtroCasaEventosAdmin").addEventListener("change", aplicarFiltroAdminFinal);

    bloco.querySelectorAll("[data-tipo-admin]").forEach(botao => {
        botao.addEventListener("click", () => {
            bloco.querySelectorAll("[data-tipo-admin]").forEach(item => item.classList.remove("active"));
            botao.classList.add("active");
            aplicarFiltroAdminFinal();
        });
    });
}

function obterTipoFiltroAdminFinal() {
    return document.querySelector("[data-tipo-admin].active")?.dataset.tipoAdmin || "todos";
}

function aplicarFiltroAdminFinal() {
    const select = document.getElementById("filtroCasaEventosAdmin");
    const lista = document.getElementById("listaEventosFiltradosAdmin");

    if (!select || !lista) return;

    const casa = select.value;
    const tipoFiltro = obterTipoFiltroAdminFinal();

    if (!casa) {
        lista.innerHTML = `<div class="admin-sem-eventos-casa">Selecione uma Casa de Cultura para visualizar os eventos disponíveis.</div>`;
        return;
    }

    const eventos = [
        ...obterEventosFixosAdminFinal(casa, tipoFiltro),
        ...obterEventosSalvosAdminFinal(casa, tipoFiltro)
    ];

    if (!eventos.length) {
        lista.innerHTML = `<div class="admin-sem-eventos-casa">Nenhum evento encontrado nesta categoria.</div>`;
        return;
    }

    lista.innerHTML = eventos.map((evento, index) => `
        <article class="admin-evento-filtrado-card">
            <div>
                <span>${evento.categoria || "EVENTO"}</span>
                <h3>${evento.titulo || evento.nome || "Evento cultural"}</h3>
                <p><strong>Tipo:</strong> ${evento.tipo || "mensal"}</p>
                <p><strong>Casa:</strong> ${evento.local || evento.localEvento || casa}</p>
                <p><strong>Data/Horário:</strong> ${[evento.data || evento.dataEvento, evento.hora || evento.horario].filter(Boolean).join(" | ") || "Não informado"}</p>
                ${evento.descricao ? `<p><strong>Descrição:</strong> ${evento.descricao}</p>` : ""}
            </div>
            <button type="button"
                class="btn-apagar-filtrado-admin"
                data-index="${index}"
                data-origem="${evento.origem}"
                data-id-programacao="${evento.__idProgramacao || ""}"
                data-casa-programacao="${evento.__casaProgramacao || ""}"
                data-chave="${evento.__chaveOrigem || ""}"
                data-index-origem="${evento.__indexOrigem ?? ""}">
                Apagar
            </button>
        </article>
    `).join("");

    lista.querySelectorAll(".btn-apagar-filtrado-admin").forEach(botao => {
        botao.addEventListener("click", () => {
            const posicaoAtual = window.scrollY || document.documentElement.scrollTop || 0;

            if (botao.dataset.origem === "localStorage") {
                const chave = botao.dataset.chave;
                const indexOrigem = Number(botao.dataset.indexOrigem);
                const eventosChave = JSON.parse(localStorage.getItem(chave) || "[]");

                if (Array.isArray(eventosChave) && eventosChave[indexOrigem]) {
                    eventosChave.splice(indexOrigem, 1);
                    localStorage.setItem(chave, JSON.stringify(eventosChave));
                }
            } else {
                const casaProgramacao = botao.dataset.casaProgramacao;
                const idProgramacao = botao.dataset.idProgramacao;
                const removidos = JSON.parse(localStorage.getItem("eventosProgramacaoRemovidos") || "{}");

                removidos[casaProgramacao] = removidos[casaProgramacao] || [];

                if (!removidos[casaProgramacao].includes(idProgramacao)) {
                    removidos[casaProgramacao].push(idProgramacao);
                }

                localStorage.setItem("eventosProgramacaoRemovidos", JSON.stringify(removidos));
            }

            aplicarFiltroAdminFinal();

            requestAnimationFrame(() => {
                window.scrollTo(0, posicaoAtual);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    limparEventosAntigosAdminFinal();

    setTimeout(() => {
        criarFiltroAdminFinal();
        aplicarFiltroAdminFinal();
    }, 700);
});


function ocultarControlesDuplicadosAdmin() {
    document.querySelectorAll(".admin-filtro-casa-eventos, .admin-filtro-casa-eventos-inline").forEach(el => {
        el.remove();
    });

    const filtroFinal = document.querySelector(".admin-filtro-casa-eventos-final");

    document.querySelectorAll(".admin-home-control, .admin-event-controls, .eventos-controle-home").forEach(el => {
        if (!filtroFinal || !el.contains(filtroFinal)) {
            el.style.display = "none";
        }
    });

    document.querySelectorAll("section, div").forEach(el => {
        const texto = (el.textContent || "").trim();

        if (
            texto.includes("CONTROLE DA HOME") &&
            texto.includes("Eventos cadastrados") &&
            texto.includes("Apague eventos semanais ou mensais")
        ) {
            if (!filtroFinal || !el.contains(filtroFinal)) {
                el.style.display = "none";
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(ocultarControlesDuplicadosAdmin, 900);
    setTimeout(ocultarControlesDuplicadosAdmin, 1600);
});


eventoLocalStorageEhValidoAdminFinal = function () {
    return true;
};

obterEventosSalvosAdminFinal = function (casa, tipoFiltro) {
    const todos = [];
    const casaNormalizada = normalizarAdminFinal(casa);

    ["eventosAdmin", "eventosPortal", "eventosCulturais", "eventos"].forEach(chave => {
        const eventos = JSON.parse(localStorage.getItem(chave) || "[]");

        if (!Array.isArray(eventos)) return;

        eventos.forEach((evento, index) => {
            const local = evento.local || evento.localEvento || evento.casa || evento.unidade || "";
            const localNormalizado = normalizarAdminFinal(local);
            const tipo = obterTipoEventoAdminFinal(evento);

            const bateCasa =
                !casa ||
                localNormalizado.includes(casaNormalizada) ||
                casaNormalizada.includes(localNormalizado);

            const bateTipo = tipoFiltro === "todos" || tipo === tipoFiltro;

            if (bateCasa && bateTipo) {
                todos.push({
                    ...evento,
                    tipo,
                    periodicidade: tipo === "mensal" ? "Mensal" : "Semanal",
                    titulo: evento.titulo || evento.nome || "Evento cultural",
                    nome: evento.nome || evento.titulo || "Evento cultural",
                    categoria: evento.categoria || "EVENTO",
                    data: evento.data || evento.dataEvento || "",
                    hora: evento.hora || evento.horario || "",
                    horario: evento.horario || evento.hora || "",
                    local,
                    origem: "localStorage",
                    __chaveOrigem: chave,
                    __indexOrigem: index
                });
            }
        });
    });

    return todos;
};

document.addEventListener("DOMContentLoaded", () => {
    const formAdminVinculo = document.getElementById("eventoForm");

    if (formAdminVinculo && !formAdminVinculo.dataset.vinculoControleAplicado) {
        formAdminVinculo.dataset.vinculoControleAplicado = "true";

        formAdminVinculo.addEventListener("submit", () => {
            setTimeout(() => {
                if (typeof aplicarFiltroAdminFinal === "function") {
                    aplicarFiltroAdminFinal();
                }

                const selectCasa = document.getElementById("filtroCasaEventosAdmin");
                const localEvento = document.getElementById("localEvento");

                if (selectCasa && localEvento && localEvento.value) {
                    selectCasa.value = localEvento.value;
                    aplicarFiltroAdminFinal();
                }
            }, 200);
        });
    }
});





function mostrarPopupEventoSalvo() {
    let popup = document.getElementById("popupEventoSalvo");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "popupEventoSalvo";
        popup.className = "popup-evento-salvo";
        popup.innerHTML = `
            <div class="popup-evento-salvo-card">
                <strong>Evento salvo com sucesso!</strong>
                <span>O evento foi adicionado à Home e ao controle administrativo.</span>
                <button type="button" id="btnFecharPopupEvento">OK</button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    popup.classList.add("mostrar");

    const fechar = document.getElementById("btnFecharPopupEvento");
    if (fechar) {
        fechar.onclick = () => popup.classList.remove("mostrar");
    }

    setTimeout(() => {
        popup.classList.remove("mostrar");
    }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
    const formEventoPopup = document.getElementById("eventoForm");

    if (!formEventoPopup || formEventoPopup.dataset.popupSalvarAplicado === "true") return;

    formEventoPopup.dataset.popupSalvarAplicado = "true";

    formEventoPopup.addEventListener("submit", () => {
        const camposObrigatorios = [
            "nomeEvento",
            "categoriaEvento",
            "dataEvento",
            "horarioEvento",
            "localEvento",
            "descricaoEvento"
        ];

        const formularioValido = camposObrigatorios.every(id => {
            const campo = document.getElementById(id);
            return campo && String(campo.value || "").trim();
        });

        if (!formularioValido) return;

        setTimeout(() => {
            mostrarPopupEventoSalvo();
        }, 250);
    });
});
