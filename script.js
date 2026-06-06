const unidades = [
    { nome: "Brasilândia", endereco: "Praça Benedicta Cavalheiro, s/nº", lat: -23.4682057, lng: -46.6836932 },
    { nome: "Butantã", endereco: "Av. Junta Mizumoto, 13", lat: -23.5855018, lng: -46.7454228 },
    { nome: "Campo Limpo", endereco: "Rua Aroldo de Azevedo, 100", lat: -23.6429671, lng: -46.7588726 },
    { nome: "Chico Science (Ipiranga)", endereco: "Av. Tancredo Neves, 1265", lat: -23.6111105, lng: -46.6133486 },
    { nome: "Freguesia do Ó", endereco: "Largo da Matriz de Nossa Senhora do Ó, 215", lat: -23.480088, lng: -46.6997415 },
    { nome: "Guaianases", endereco: "Rua Castelo de Leça, s/n", lat: -23.5413146, lng: -46.4173167 },
    { nome: "Hip Hop Leste", endereco: "Av. Sarah Kubitschek, 165", lat: -23.5936442, lng: -46.4022684 },
    { nome: "Hip Hop Sul", endereco: "Rua Sant'Ana, 201", lat: -23.7042525, lng: -46.6917631 },
    { nome: "Itaim Paulista", endereco: "Rua Monte Camberela, 490", lat: -23.4985651, lng: -46.3952723 },
    { nome: "Itaquera (Raul Seixas)", endereco: "Rua Murmúrios da Tarde, 211", lat: -23.5401149, lng: -46.4430034 },
    { nome: "M'Boi Mirim", endereco: "Av. Inácio Dias da Silva, s/nº", lat: -23.681177, lng: -46.7641249 },
    { nome: "Parelheiros", endereco: "Rua Nazle Mauad Lutfi, 169", lat: -23.8236357, lng: -46.7335641 },
    { nome: "Santo Amaro (Júlio Guerra)", endereco: "Praça Floriano Peixoto, 131", lat: -23.647614, lng: -46.7038381 },
    { nome: "Santo Amaro (Manoel Cardoso)", endereco: "Praça Salim Farah Maluf, s/n", lat: -23.6517173, lng: -46.7077647 },
    { nome: "São Mateus", endereco: "Rua Monte Mandirá, 40", lat: -23.606236, lng: -46.4827552 },
    { nome: "São Miguel Paulista", endereco: "Rua Irineu Bonardi, 169", lat: -23.4962947, lng: -46.4442654 },
    { nome: "São Rafael", endereco: "Rua Quaresma Delgado, 376", lat: -23.6262186, lng: -46.4677755 },
    { nome: "Tremembé", endereco: "Rua Maria Amália Lopes de Azevedo, 190", lat: -23.4479955, lng: -46.6163351 },
    { nome: "Vila Guilherme (Casarão)", endereco: "Praça Oscar Silva, 111", lat: -23.5117462, lng: -46.5989142 }
];

const eventos = [
    
    { tipo: "semanal", 
        titulo: "Oficina Ayabas Empoderadas (Jeniffer Brito)", 
        categoria: "Oficina de Videomaker", 
        data: "30.05", 
        hora: "14h às 18h" },
        
    { tipo: "semanal", 
        titulo: "Flashback e Charme", 
        categoria: "Dança", 
        data: "Toda 4ª feira", 
        hora: "10h10 às 11h" },

    {   tipo: "semanal", 
        titulo: "Aulas de Zumba", 
        categoria: "Dança / Bem-Estar", 
        data: "Toda 4ª feira", 
        hora: "09h30 às 10h10"}, 
            
    {   tipo: "mensal", 
        titulo: "Charme Black na Praça (DJ Agulha - Convidados: Energia Black / Casca de Bala)", 
        categoria: "Música", 
        data: "17.05", 
        hora: "A partir das 12h"},
        
    { tipo: "mensal", 
        titulo: "Viradinha Infantil (Virada Cultural)", 
        categoria: "Festival Infantil / Brincadeiras", 
        data: "24.05", 
        hora: "A partir das 11h"},
        
    { tipo: "mensal", 
        titulo: "Baile com Forró (Trio Golada)", 
        categoria: "Música / Dança", 
        data: "30.05", 
        hora: "A partir das 16h" }
     
];

const projetosPDF = [
    {
        titulo: "Programa de Iniciação Artística — PIÁ",
        publico: "Crianças e adolescentes",
        imagem: "img/projeto_pia.png",
        descricao: "Projeto gratuito da Prefeitura de São Paulo com oficinas semanais de artes para crianças e adolescentes de 6 a 14 anos.",
        itens: ["Artes visuais, dança, música e teatro", "Oficinas semanais", "Faixa etária: 6 a 14 anos"]
    },
    {
        titulo: "Zumba",
        publico: "Adultos e idosos",
        imagem: "img/zumba.png",
        descricao: "Aulas de dança fitness que combinam música e movimentos acessíveis para melhorar a saúde e promover socialização.",
        itens: ["Saúde física e mobilidade", "Exercício com música e movimento", "Atividade aberta à comunidade"]
    },
    {
        titulo: "Batalha de Rimas",
        publico: "Jovens",
        imagem: "img/batalha_rima.png",
        descricao: "Espaço de expressão e pertencimento que utiliza a cultura hip-hop para conectar jovens da periferia à Casa de Cultura.",
        itens: ["Batalhas de rima com MCs locais", "Visibilidade para artistas da região", "Protagonismo e expressão juvenil"]
    },
    {
        titulo: "Jovem Monitor",
        publico: "Política pública",
        imagem: "img/jovem_monitor.png",
        descricao: "Programa de formação que insere jovens na gestão de espaços culturais, desenvolvendo habilidades práticas e profissionais.",
        itens: ["Duração de até 2 anos", "Ingressantes e continuístas", "Inserção profissional na cultura"]
    }
];

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
                        .bindPopup(`<b>${un.nome}</b>`);
        markers[i] = marker;

        const card = document.createElement('div');
        card.className = 'cardmap';
        card.innerHTML = `<h4>${un.nome}</h4><p>${un.endereco}</p>`;
        
        card.onclick = () => {
            map.flyTo([un.lat, un.lng], 16);
            markers[i].openPopup();
        };
        
        listaUnidadesContainer.appendChild(card);
    });
}

function renderizarEventos(filtro = "semanal") {
    const proContainer = document.getElementById('pro-container');
    if (!proContainer) return;
    
    proContainer.innerHTML = ""; 

    const filtrados = eventos.filter(evento => evento.tipo === filtro);

    filtrados.forEach(ev => {
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
            <a href="#" class="btn-inscrever">Galeria</a>
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

        const filtro = botao.getAttribute('data-filter');
        renderizarEventos(filtro);
    };
});


renderizarEventos("semanal");
renderizarProjetos();