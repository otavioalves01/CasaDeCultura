

(function limparEventosAntigosUmaVez() {
    if (!localStorage.getItem("eventosResetadosHomeVazio")) {
        localStorage.setItem("eventosPortal", JSON.stringify([]));
        localStorage.setItem("eventosCulturais", JSON.stringify([]));
        localStorage.setItem("eventos", JSON.stringify([]));
        localStorage.setItem("eventosResetadosHomeVazio", "sim");
    }
})();

const unidades = [
    {
        "nome": "Brasilândia",
        "endereco": "Praça Benedicta Cavalheiro, s/nº - Brasilândia / Zona Norte",
        "telefone": "3922-9123",
        "horario": "Terça a domingo das 10h às 20h30",
        "lat": -23.4682057,
        "lng": -46.6836932
    },
    {
        "nome": "Butantã",
        "endereco": "Av. Junta Mizumoto, 13 - Jardim Peri Peri / Zona Oeste",
        "telefone": "3742-6218 / 3744-4369",
        "horario": "Terça a domingo das 9h às 21h",
        "lat": -23.5855018,
        "lng": -46.7454228
    },
    {
        "nome": "Parelheiros",
        "endereco": "Rua Nazle Mauad Lutfi, 169 - Parque Tamari",
        "telefone": "Não informado",
        "horario": "Terça a domingo das 09h às 19h",
        "lat": -23.8236357,
        "lng": -46.7335641
    },
    {
        "nome": "Chico Science (Ipiranga)",
        "endereco": "Av. Tancredo Neves, 1265 - Moinho Velho / Zona Sul",
        "telefone": "2969-7066",
        "horario": "Terça a domingo das 09h às 21h",
        "lat": -23.6111105,
        "lng": -46.6133486
    },
    {
        "nome": "Guaianases",
        "endereco": "Rua Castelo de Leça, s/n - Jardim Soares - Guaianases / Zona Leste",
        "telefone": "Não informado",
        "horario": "Terça a sábado das 09h às 21h | Domingo das 09h às 20h",
        "lat": -23.5413146,
        "lng": -46.4173167
    },
    {
        "nome": "Hip Hop Leste",
        "endereco": "Av. Sarah Kubitschek, 165 - Cidade Tiradentes / Zona Leste",
        "telefone": "3396-0106",
        "horario": "Terça a domingo das 09h às 21h",
        "lat": -23.5936442,
        "lng": -46.4022684
    },
    {
        "nome": "Hip Hop Sul",
        "endereco": "Rua Sant'Ana, 201 - Vila São Pedro / Zona Sul",
        "telefone": "5631-0740",
        "horario": "Terça a domingo das 09h às 21h",
        "lat": -23.7042525,
        "lng": -46.6917631
    },
    {
        "nome": "Itaim Paulista",
        "endereco": "Rua Monte Camberela, 490 - Vila Silva Teles / Zona Leste",
        "telefone": "2963-2742",
        "horario": "Terça a sábado das 09h às 21h | Domingo até 20h",
        "lat": -23.4985651,
        "lng": -46.3952723
    },
    {
        "nome": "Itaquera (Raul Seixas)",
        "endereco": "Rua Murmúrios da Tarde, 211 - Cohab 2 José Bonifácio - Itaquera / Zona Leste",
        "telefone": "2521-6411",
        "horario": "Terça a domingo das 09h às 18h",
        "lat": -23.5401149,
        "lng": -46.4430034
    },
    {
        "nome": "M'Boi Mirim",
        "endereco": "Av. Inácio Dias da Silva, s/nº - M'Boi Mirim / Zona Sul",
        "telefone": "5514-3408",
        "horario": "Terça a domingo das 08h às 21h",
        "lat": -23.681177,
        "lng": -46.7641249
    },
    {
        "nome": "Santo Amaro (Júlio Guerra)",
        "endereco": "Praça Floriano Peixoto, 131 - Santo Amaro / Zona Sul",
        "telefone": "(11) 5523-6455",
        "horario": "Terça a domingo das 10h às 18h",
        "lat": -23.647614,
        "lng": -46.7038381
    },
    {
        "nome": "Santo Amaro (Manoel Mendonça)",
        "endereco": "Praça Dr. Francisco Ferreira Lopes, 434 - Santo Amaro / Zona Sul",
        "telefone": "5522-8897",
        "horario": "Terça a domingo das 09h às 21h | Segunda: 19h",
        "lat": -23.6517173,
        "lng": -46.7077647
    },
    {
        "nome": "Campo Limpo (Dora Nascimento)",
        "endereco": "Rua Aroldo de Azevedo, 100 - Campo Limpo / Zona Sul",
        "telefone": "5841-8164",
        "horario": "Terça a domingo das 09h às 21h",
        "lat": -23.6429671,
        "lng": -46.7588726
    },
    {
        "nome": "Freguesia do Ó (Salvador Ligabue)",
        "endereco": "Largo da Matriz de Nossa Senhora do Ó, 215 - Freguesia do Ó / Zona Norte",
        "telefone": "3931-8266",
        "horario": "Terça a domingo das 09h às 21h",
        "lat": -23.480088,
        "lng": -46.6997415
    },
    {
        "nome": "São Mateus",
        "endereco": "Rua Monte Mandirá, 40 - São Mateus / Zona Leste",
        "telefone": "3793-1054",
        "horario": "Terça a domingo das 09h às 21h",
        "lat": -23.606236,
        "lng": -46.4827552
    },
    {
        "nome": "São Miguel Paulista",
        "endereco": "Rua Irineu Bonardi, 169 - São Miguel Paulista / Zona Leste",
        "telefone": "2032-4090",
        "horario": "Terça a domingo das 9h às 21h",
        "lat": -23.4962947,
        "lng": -46.4442654
    },
    {
        "nome": "São Rafael",
        "endereco": "Rua Quaresma Delgado, 376 - São Rafael / Zona Leste",
        "telefone": "2012-5803",
        "horario": "Terça a domingo das 9h às 21h",
        "lat": -23.6262186,
        "lng": -46.4677755
    },
    {
        "nome": "Tremembé",
        "endereco": "Rua Maria Amália Lopes de Azevedo, 190 - Tremembé / Zona Norte",
        "telefone": "2991-4291",
        "horario": "Todos os dias das 08h às 19h",
        "lat": -23.4479955,
        "lng": -46.6163351
    },
    {
        "nome": "Vila Guilherme (Casarão)",
        "endereco": "Praça Oscar Silva, 111 - Vila Guilherme / Zona Norte",
        "telefone": "2901-5186",
        "horario": "Terça a domingo das 9h às 21h",
        "lat": -23.5117462,
        "lng": -46.5989142
    },
    {
        "nome": "Cidade Ademar",
        "endereco": "Rua Professor Oscar Barreto Filho, 252 - Cidade Ademar / Zona Sul",
        "telefone": "Não informado",
        "horario": "Terça a domingo das 9h às 21h",
        "lat": -23.6828,
        "lng": -46.6497
    }
];

const eventos = [];


function lerEventosJSON(chave, fallback) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || fallback;
    } catch {
        return fallback;
    }
}

function eventosComIdPadrao() {
    const contadores = { semanal: 0, mensal: 0 };

    return eventos.map((evento) => {
        const tipo = evento.tipo === "mensal" ? "mensal" : "semanal";
        contadores[tipo] += 1;

        return {
            ...evento,
            id: `padrao-${tipo}-${contadores[tipo]}`,
            periodicidade: tipo === "mensal" ? "Mensal" : "Semanal",
            nome: evento.titulo,
            local: evento.local || "Itaquera (Raul Seixas)",
            origem: "padrao"
        };
    });
}

function obterEventosAtivosHome() {
    const personalizados = lerEventosJSON("eventosAdmin", []).map(evento => {
        const tipoBase = (evento.tipo || evento.periodicidade || "semanal").toString().toLowerCase();
        const tipo = tipoBase.includes("mensal") ? "mensal" : "semanal";

        return {
            ...evento,
            id: evento.id || `admin-${Date.now()}`,
            tipo,
            titulo: evento.titulo || evento.nome || "Evento sem nome",
            categoria: evento.categoria || "Evento",
            data: evento.data || "",
            hora: evento.hora || evento.horario || "",
            local: evento.local || "",
            origem: "admin"
        };
    });

    const removidos = lerEventosJSON("eventosRemovidosAdmin", []);
    return [...eventosComIdPadrao(), ...personalizados]
        .filter(evento => !removidos.includes(evento.id));
}


const projetosPDF = [
    {
        titulo: "Programa de Iniciação Artística — PIÁ",
        galeriaId: "pia",
        publico: "Crianças e adolescentes",
        imagem: "img/projeto_pia.png",
        descricao: "Projeto gratuito da Prefeitura de São Paulo com oficinas semanais de artes para crianças e adolescentes de 6 a 14 anos.",
        itens: ["Artes visuais, dança, música e teatro", "Oficinas semanais", "Faixa etária: 6 a 14 anos"]
    },
    {
        titulo: "Zumba",
        galeriaId: "zumba",
        publico: "Adultos e idosos",
        imagem: "img/zumba.png",
        descricao: "Aulas de dança fitness que combinam música e movimentos acessíveis para melhorar a saúde e promover socialização.",
        itens: ["Saúde física e mobilidade", "Exercício com música e movimento", "Atividade aberta à comunidade"]
    },
    {
        titulo: "Batalha de Rimas",
        galeriaId: "batalha-rimas",
        publico: "Jovens",
        imagem: "img/batalha_rima.png",
        descricao: "Espaço de expressão e pertencimento que utiliza a cultura hip-hop para conectar jovens da periferia à Casa de Cultura.",
        itens: ["Batalhas de rima com MCs locais", "Visibilidade para artistas da região", "Protagonismo e expressão juvenil"]
    },
    {
        titulo: "Jovem Monitor",
        galeriaId: "jovem-monitor",
        publico: "Política pública",
        imagem: "img/IMG 40.png",
        descricao: "Programa de formação que insere jovens na gestão de espaços culturais, desenvolvendo habilidades práticas e profissionais.",
        itens: ["Duração de até 2 anos", "Ingressantes e continuístas", "Inserção profissional na cultura"]
    }
];


function normalizarTextoBusca(texto) {
    return (texto || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function eventosDaUnidade(nomeUnidade) {
    const nome = normalizarTextoBusca(nomeUnidade);

    return obterEventosAtivosHome().filter(evento => {
        const local = normalizarTextoBusca(evento.local);
        return local && (local.includes(nome) || nome.includes(local));
    });
}

function montarResumoEventosUnidade(nomeUnidade) {
    const eventosUnidade = eventosDaUnidade(nomeUnidade);

    if (!eventosUnidade.length) {
        return `<div class="mapa-eventos-unidade"><strong></strong><p>.</p></div>`;
    }

    return `
        <div class="mapa-eventos-unidade">
            <strong></strong>
            ${eventosUnidade.slice(0, 4).map(evento => `
                <div class="mapa-evento-item">
                    <span class="mapa-evento-tipo ${evento.tipo}">${evento.periodicidade || (evento.tipo === "mensal" ? "Mensal" : "Semanal")}</span>
                    <b>${evento.titulo}</b>
                    <small>${evento.data || "Data não informada"} • ${evento.hora || "Horário não informado"}</small>
                </div>
            `).join("")}
        </div>
    `;
}

const mapDisplay = document.getElementById('map-display');
const markers = {};
const listaUnidadesContainer = document.getElementById('lista-unidades');

if (mapDisplay && listaUnidadesContainer) {
    const map = L.map('map-display').setView([-23.5505, -46.6333], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    unidades.forEach((un, i) => {
        const marker = L.marker([un.lat, un.lng]).addTo(map)
                        .bindPopup(`<b>${un.nome}</b>${montarResumoEventosUnidade(un.nome)}`);
        markers[i] = marker;

        const card = document.createElement('div');
        card.className = 'cardmap';
        card.innerHTML = `<h4>${un.nome}</h4><p>${un.endereco}</p>${montarResumoEventosUnidade(un.nome)}`;
        
        card.onclick = () => {
            map.flyTo([un.lat, un.lng], 16);
            markers[i].openPopup();
        };
        
        listaUnidadesContainer.appendChild(card);
    });
}

let eventosExpandidos = false;
let filtroAtualEventos = "semanal";

function atualizarBotaoVerMaisEventos(totalEventos) {
    const header = document.querySelector('.pg-header');
    if (!header) return;

    let linhaBotao = document.querySelector('.ver-mais-eventos-row');
    if (!linhaBotao) {
        linhaBotao = document.createElement('div');
        linhaBotao.className = 'ver-mais-eventos-row';
        header.insertAdjacentElement('afterend', linhaBotao);
    }

    let botao = document.getElementById('btn-ver-mais-eventos');
    if (!botao) {
        botao = document.createElement('button');
        botao.id = 'btn-ver-mais-eventos';
        botao.type = 'button';
        botao.className = 'btn-ver-mais-eventos';
        linhaBotao.appendChild(botao);
    }

    const temMuitosCards = totalEventos >= 5;
    botao.disabled = !temMuitosCards;
    botao.classList.toggle('ativo', temMuitosCards);
    botao.classList.toggle('inativo', !temMuitosCards);
    botao.innerHTML = '<span class="texto-eventos">Ver mais</span><span class="seta-eventos" aria-hidden="true">→</span>';

    botao.onclick = () => {
        if (!temMuitosCards) return;
        const proContainer = document.getElementById('pro-container');
        if (!proContainer) return;

        const chegouNoFinal = proContainer.scrollLeft + proContainer.clientWidth >= proContainer.scrollWidth - 20;
        if (chegouNoFinal) {
            proContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            proContainer.scrollBy({ left: 360, behavior: 'smooth' });
        }
    };
}

function renderizarEventos(filtro = "semanal") {
    const proContainer = document.getElementById('pro-container');
    if (!proContainer) return;
    
    proContainer.innerHTML = ""; 

    filtroAtualEventos = filtro;
    const filtrados = obterEventosAtivosHome().filter(evento => evento.tipo === filtro);
    atualizarBotaoVerMaisEventos(filtrados.length);

    const eventosParaExibir = filtrados;

    eventosParaExibir.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'cardpro';
        card.innerHTML = `
            <div>
                <span class="categoria">${ev.categoria}</span>
                <h4>${ev.titulo}</h4>
            </div>
            <div class="time-info">
                <span>📅 ${ev.data}</span>
                <span>|</span>
                <span>⏰ ${ev.hora}</span>
            </div>
            ${ev.local ? `<p class="cardpro-local">📍 ${ev.local}</p>` : ""}
        `;
        proContainer.appendChild(card);
    });
}

function renderizarProjetos() {
    const projContainer = document.getElementById('projetos-container');
    if (!projContainer) return;
    
    projContainer.innerHTML = ""; 

    projetosPDF.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'cardproje';
        
        const listItems = proj.itens.map(item => `<li>${item}</li>`).join('');
        
        const imagemProjeto = proj.imagem
            ? `<img src="${proj.imagem}" alt="Imagem do projeto ${proj.titulo}" class="projeto-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="projeto-img-placeholder" style="display:none"><span>Adicionar imagem</span></div>`
            : `<div class="projeto-img-placeholder"><span>Adicionar imagem</span></div>`;

        card.innerHTML = `
            ${imagemProjeto}
            <div class="card-content">
                <span class="projeto-publico">${proj.publico}</span>
                <h3>${proj.titulo}</h3>
                <p>${proj.descricao}</p>
                <ul>${listItems}</ul>
            </div>
            <a href="galeria.html#${proj.galeriaId}" class="btn-inscrever" title="Abrir galeria do projeto ${proj.titulo}">Galeria</a>
        `;
        projContainer.appendChild(card);
    });
}

const botoes = document.querySelectorAll('.btn-tab');
botoes.forEach(botao => {
    botao.onclick = () => {
        const botaoAtivoAnterior = document.querySelector('.btn-tab.active');
        if (botaoAtivoAnterior) {
            botaoAtivoAnterior.classList.remove('active');
        }
        botao.classList.add('active');

        eventosExpandidos = false;
        const filtro = botao.getAttribute('data-filter');
        renderizarEventos(filtro);
    };
});


renderizarEventos("semanal");
renderizarProjetos();

document.addEventListener("DOMContentLoaded", () => {
    const styleHomeMapa = document.createElement("style");
    styleHomeMapa.textContent = `
        #lista-unidades .eventos-unidade,
        #lista-unidades .eventos-casa,
        #lista-unidades .unidade-eventos,
        #lista-unidades .eventos-da-unidade,
        #lista-unidades .eventos-desta-unidade,
        #lista-unidades h5,
        #lista-unidades .tag-evento,
        #lista-unidades .evento-card-mini,
        #lista-unidades .evento-unidade-item {
            display: none !important;
        }
    `;
    document.head.appendChild(styleHomeMapa);
});



function atualizarTextosUnidadesHome() {
    const lista = document.getElementById("lista-unidades");
    if (!lista || typeof unidades === "undefined") return;

    const cards = lista.querySelectorAll(".cardmap");
    cards.forEach((card, index) => {
        const unidade = unidades[index];
        if (!unidade) return;

        card.innerHTML = `
            <h4>${unidade.nome}</h4>
            <p><strong>Endereço:</strong> ${unidade.endereco || "Não informado"}</p>
            <p><strong>Telefone:</strong> ${unidade.telefone || "Não informado"}</p>
            <p><strong>Horário:</strong> ${unidade.horario || "Não informado"}</p>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(atualizarTextosUnidadesHome, 400);
});



document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (typeof map !== "undefined" && map && document.getElementById("map-display")) {
            map.closePopup();
        }
    }, 500);
});


document.addEventListener("DOMContentLoaded", () => {
    const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    const boasVindas = document.getElementById("boasVindas");

    if (!usuarioAtual && boasVindas) {
        boasVindas.innerHTML = "";
        boasVindas.style.display = "none";
    }
});



let casaSelecionadaHome = null;
let tipoEventoHome = "semanal";

function normalizarCasaHome(nome) {
    return String(nome || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function encontrarChaveEventosCasa(nomeCasa) {
    if (typeof EVENTOS_POR_CASA === "undefined") return null;

    const alvo = normalizarCasaHome(nomeCasa);

    return Object.keys(EVENTOS_POR_CASA).find(chave => {
        const normalizada = normalizarCasaHome(chave);
        return normalizada === alvo ||
               normalizada.includes(alvo) ||
               alvo.includes(normalizada);
    }) || null;
}

function obterEventosCasaSelecionada() {
    if (!casaSelecionadaHome || typeof EVENTOS_POR_CASA === "undefined") return [];

    const chave = encontrarChaveEventosCasa(casaSelecionadaHome);
    if (!chave) return [];

    const grupo = EVENTOS_POR_CASA[chave] || { semanal: [], mensal: [] };
    return grupo[tipoEventoHome] || [];
}

function criarCardEventoHome(evento) {
    const dataHorario = [evento.data, evento.horario].filter(Boolean).join(" | ");

    return `
        <div class="cardpro">
            <span class="categoria">${evento.categoria || "EVENTO"}</span>
            <h4>${evento.titulo || evento.nome || "Evento cultural"}</h4>
            ${dataHorario ? `<div class="time-info">${dataHorario}</div>` : ""}
            ${evento.descricao ? `<p class="evento-descricao-home">${evento.descricao}</p>` : ""}
            <p class="evento-local-home">📍 ${evento.local || casaSelecionadaHome}</p>
        </div>
    `;
}

function renderizarMensagemInicialHome() {
    const container = document.getElementById("pro-container");
    if (!container) return;

    container.innerHTML = `
        <div class="card-selecione-casa-home">
            <strong>Selecione uma Casa de Cultura</strong>
            <span>Clique em uma unidade no mapa ou na lista para visualizar os eventos disponíveis.</span>
        </div>
    `;

    atualizarBotaoVerMaisHome();
}

function renderizarEventosDaCasaHome() {
    const container = document.getElementById("pro-container");
    if (!container) return;

    if (!casaSelecionadaHome) {
        renderizarMensagemInicialHome();
        return;
    }

    const eventos = obterEventosCasaSelecionada();

    if (!eventos.length) {
        container.innerHTML = `
            <div class="sem-eventos-home">
                <strong>Nenhum evento cadastrado no momento.</strong>
                <span>${casaSelecionadaHome}</span>
            </div>
        `;
        atualizarBotaoVerMaisHome();
        return;
    }

    container.innerHTML = eventos.map(criarCardEventoHome).join("");
    atualizarBotaoVerMaisHome();
}

function selecionarCasaEventosHome(nomeCasa) {
    casaSelecionadaHome = nomeCasa || null;

    document.querySelectorAll("#lista-unidades .cardmap").forEach(card => {
        card.classList.remove("unidade-selecionada-home");
    });

    document.querySelectorAll("#lista-unidades .cardmap").forEach(card => {
        const titulo = card.querySelector("h4")?.textContent || "";
        if (normalizarCasaHome(titulo).includes(normalizarCasaHome(casaSelecionadaHome)) ||
            normalizarCasaHome(casaSelecionadaHome).includes(normalizarCasaHome(titulo))) {
            card.classList.add("unidade-selecionada-home");
        }
    });

    renderizarEventosDaCasaHome();
}

function atualizarBotaoVerMaisHome() {
    const btn = document.querySelector(".btn-ver-mais-eventos");
    const container = document.getElementById("pro-container");
    if (!btn || !container) return;

    const totalCards = container.querySelectorAll(".cardpro").length;
    const podeRolar = totalCards > 3 || container.scrollWidth > container.clientWidth + 20;

    btn.classList.toggle("ativo", podeRolar);
    btn.classList.toggle("inativo", !podeRolar);
}

function configurarBotaoVerMaisHome() {
    const btn = document.querySelector(".btn-ver-mais-eventos");
    const container = document.getElementById("pro-container");

    if (!btn || !container || btn.dataset.verMaisLigado === "sim") return;

    btn.dataset.verMaisLigado = "sim";

    btn.addEventListener("click", (event) => {
        event.preventDefault();

        if (!btn.classList.contains("ativo")) return;

        const deslocamento = Math.max(360, container.clientWidth * 0.85);

        container.scrollBy({
            left: deslocamento,
            behavior: "smooth"
        });
    });
}

function configurarTabsEventosHome() {
    document.querySelectorAll(".btn-tab").forEach(btn => {
        if (btn.dataset.tabEventosLigado === "sim") return;
        btn.dataset.tabEventosLigado = "sim";

        btn.addEventListener("click", () => {
            document.querySelectorAll(".btn-tab").forEach(item => item.classList.remove("active"));
            btn.classList.add("active");

            tipoEventoHome = btn.dataset.filter || "semanal";
            renderizarEventosDaCasaHome();
        });
    });
}

function conectarListaUnidadesComEventosHome() {
    const lista = document.getElementById("lista-unidades");
    if (!lista || typeof unidades === "undefined" || lista.dataset.eventosLigados === "sim") return;

    lista.dataset.eventosLigados = "sim";

    lista.addEventListener("click", (event) => {
        const card = event.target.closest(".cardmap");
        if (!card) return;

        const cards = Array.from(lista.querySelectorAll(".cardmap"));
        const index = cards.indexOf(card);
        const unidade = unidades[index];

        if (unidade?.nome) {
            selecionarCasaEventosHome(unidade.nome);
        }
    });
}

function conectarMapaComEventosHome() {
    if (typeof unidades === "undefined") return;

    setTimeout(() => {
        document.querySelectorAll("#map-display .leaflet-marker-icon").forEach((marker, index) => {
            const unidade = unidades[index];
            if (!unidade?.nome || marker.dataset.eventosCasaLigado === "sim") return;

            marker.dataset.eventosCasaLigado = "sim";
            marker.addEventListener("click", () => {
                selecionarCasaEventosHome(unidade.nome);
            });
        });
    }, 900);
}

document.addEventListener("DOMContentLoaded", () => {
    casaSelecionadaHome = null;
    tipoEventoHome = "semanal";

    configurarTabsEventosHome();
    configurarBotaoVerMaisHome();

    setTimeout(() => {
        conectarListaUnidadesComEventosHome();
        conectarMapaComEventosHome();
        renderizarMensagemInicialHome();
    }, 550);
});


function configurarVerMaisProgramacaoFinal() {
    const btn = document.querySelector(".btn-ver-mais-eventos");
    const container = document.getElementById("pro-container");

    if (!btn || !container) return;

    btn.onclick = function (event) {
        event.preventDefault();

        const cards = container.querySelectorAll(".cardpro");
        if (!cards.length) return;

        const card = cards[0];
        const gap = 24;
        const deslocamento = card.offsetWidth + gap;

        container.scrollBy({
            left: deslocamento,
            behavior: "smooth"
        });
    };

    const atualizarEstado = () => {
        const podeRolar = container.scrollWidth > container.clientWidth + 10;
        btn.classList.toggle("ativo", podeRolar);
        btn.classList.toggle("inativo", !podeRolar);
        btn.disabled = !podeRolar;
    };

    container.addEventListener("scroll", atualizarEstado);
    window.addEventListener("resize", atualizarEstado);

    setTimeout(atualizarEstado, 300);
    setTimeout(atualizarEstado, 900);
}

document.addEventListener("DOMContentLoaded", () => {
    configurarVerMaisProgramacaoFinal();

    const observadorVerMais = new MutationObserver(() => {
        configurarVerMaisProgramacaoFinal();
    });

    const container = document.getElementById("pro-container");
    if (container) {
        observadorVerMais.observe(container, {
            childList: true,
            subtree: true
        });
    }
});


function criarControlesProgramacaoSetas() {
    const header = document.querySelector(".pg-header");
    const container = document.getElementById("pro-container");
    if (!header || !container) return;

    let btnVerMais = document.querySelector(".btn-ver-mais-eventos");

    if (!btnVerMais) {
        btnVerMais = document.createElement("button");
        btnVerMais.type = "button";
        btnVerMais.className = "btn-ver-mais-eventos inativo";
        btnVerMais.innerHTML = `<span class="texto-eventos">Ver mais</span><span class="seta-eventos">→</span>`;
        header.appendChild(btnVerMais);
    }

    let grupo = document.querySelector(".programacao-setas-controle");

    if (!grupo) {
        grupo = document.createElement("div");
        grupo.className = "programacao-setas-controle";

        const btnVoltar = document.createElement("button");
        btnVoltar.type = "button";
        btnVoltar.className = "btn-voltar-eventos inativo";
        btnVoltar.innerHTML = `<span class="seta-eventos">←</span><span class="texto-eventos">Voltar</span>`;

        btnVerMais.parentNode.insertBefore(grupo, btnVerMais);
        grupo.appendChild(btnVoltar);
        grupo.appendChild(btnVerMais);
    } else if (!grupo.contains(btnVerMais)) {
        grupo.appendChild(btnVerMais);
    }

    const btnVoltar = document.querySelector(".btn-voltar-eventos");

    function atualizarEstadoSetas() {
        const podeRolar = container.scrollWidth > container.clientWidth + 10;
        const noInicio = container.scrollLeft <= 8;
        const noFim = container.scrollLeft + container.clientWidth >= container.scrollWidth - 8;

        btnVerMais.classList.toggle("ativo", podeRolar && !noFim);
        btnVerMais.classList.toggle("inativo", !podeRolar || noFim);

        btnVoltar.classList.toggle("ativo", podeRolar && !noInicio);
        btnVoltar.classList.toggle("inativo", !podeRolar || noInicio);
    }

    function deslocamentoCard() {
        const card = container.querySelector(".cardpro");
        if (!card) return Math.max(320, container.clientWidth * 0.8);
        return card.offsetWidth + 24;
    }

    btnVerMais.onclick = function (event) {
        event.preventDefault();
        if (!btnVerMais.classList.contains("ativo")) return;

        container.scrollBy({
            left: deslocamentoCard(),
            behavior: "smooth"
        });
    };

    btnVoltar.onclick = function (event) {
        event.preventDefault();
        if (!btnVoltar.classList.contains("ativo")) return;

        container.scrollBy({
            left: -deslocamentoCard(),
            behavior: "smooth"
        });
    };

    container.removeEventListener("scroll", atualizarEstadoSetas);
    container.addEventListener("scroll", atualizarEstadoSetas);
    window.addEventListener("resize", atualizarEstadoSetas);

    setTimeout(atualizarEstadoSetas, 150);
    setTimeout(atualizarEstadoSetas, 700);
}

document.addEventListener("DOMContentLoaded", () => {
    criarControlesProgramacaoSetas();

    const container = document.getElementById("pro-container");

    if (container) {
        const observerSetas = new MutationObserver(() => {
            criarControlesProgramacaoSetas();
        });

        observerSetas.observe(container, {
            childList: true,
            subtree: true
        });
    }
});


function obterEventosAdminDaCasaHomeFinal(casa, tipoFiltro) {
    const eventosAdmin = JSON.parse(localStorage.getItem("eventosAdmin") || "[]");
    const casaNormalizada = normalizarCasaHome(casa);

    return eventosAdmin
        .filter(evento => {
            const tipoBase = String(evento.tipo || evento.periodicidade || "semanal").toLowerCase();
            const tipo = tipoBase.includes("mensal") ? "mensal" : "semanal";
            const local = evento.local || evento.localEvento || evento.casa || evento.unidade || "";
            const localNormalizado = normalizarCasaHome(local);

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

obterEventosCasaSelecionada = function () {
    if (!casaSelecionadaHome) return [];

    const eventosAdmin = obterEventosAdminDaCasaHomeFinal(casaSelecionadaHome, tipoEventoHome);

    let eventosFixos = [];

    if (typeof EVENTOS_POR_CASA !== "undefined") {
        const chave = encontrarChaveEventosCasa(casaSelecionadaHome);

        if (chave) {
            const grupo = EVENTOS_POR_CASA[chave] || { semanal: [], mensal: [] };
            eventosFixos = grupo[tipoEventoHome] || [];
        }
    }

    return [...eventosFixos, ...eventosAdmin];
};

criarCardEventoHome = function (evento) {
    const dataHorario = [evento.data || evento.dataEvento, evento.horario || evento.hora].filter(Boolean).join(" | ");

    return `
        <div class="cardpro">
            <span class="categoria">${evento.categoria || "EVENTO"}</span>
            <h4>${evento.titulo || evento.nome || "Evento cultural"}</h4>
            ${dataHorario ? `<div class="time-info">${dataHorario}</div>` : ""}
            ${evento.descricao ? `<p class="evento-descricao-home">${evento.descricao}</p>` : ""}
            <p class="evento-local-home">📍 ${evento.local || casaSelecionadaHome}</p>
        </div>
    `;
};

window.addEventListener("storage", event => {
    if (event.key === "eventosAdmin" && typeof renderizarEventosDaCasaHome === "function") {
        renderizarEventosDaCasaHome();
    }
});
