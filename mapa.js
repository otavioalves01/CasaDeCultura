if (document.getElementById('mapa-cultural')) {
const unidadesCulturais = [
            {
                nome: "Casa de Cultura Brasilândia",
                endereco: "Praça Benedicta Cavalheiro, s/nº - Brasilândia / Zona Norte",
                telefone: "3922-9123",
                horario: "Terça a domingo das 10h às 20h30",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.brasilandia/",
                linktree: "https://linktr.ee/casaculturabrasa",
                lat: -23.469058,
                lng: -46.698915
            },
            {
                nome: "Casa de Cultura Butantã",
                endereco: "Av. Junta Mizumoto, 13 - Jardim Peri Peri / Zona Oeste",
                telefone: "3742-6218 / 3744-4369",
                horario: "Terça a domingo das 9h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.butanta/",
                linktree: "https://linktr.ee/ccbutanta",
                lat: -23.586524,
                lng: -46.732855
            },
            {
                nome: "Casa de Cultura de Parelheiros",
                endereco: "Rua Nazle Mauad Lutfi, 169 - Parque Tamari",
                telefone: "Não informado",
                horario: "Terça a domingo das 09h às 19h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://instagram.com/ccm.parelheiros/",
                linktree: "https://linktr.ee/casadeculturaparelheiros",
                lat: -23.830676,
                lng: -46.730336
            },
            {
                nome: "Casa de Cultura Chico Science",
                endereco: "Avenida Tancredo Neves, 1265 - Moinho Velho / Zona Sul",
                telefone: "2969-7066",
                horario: "Terça a domingo das 09h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.chicoscience/",
                linktree: "https://linktr.ee/cc.chicoscience",
                lat: -23.6152458,
                lng: -46.6086577
            },
            {
                nome: "Casa de Cultura de Guaianases",
                endereco: "Rua Castelo de Leça, s/n – Jardim Soares – Guaianases / Zona Leste",
                telefone: "Não informado",
                horario: "Terça a sábado das 09h às 21h | Domingo das 09h às 20h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.guaianases/",
                linktree: "https://linktr.ee/ccm.guaianases",
                lat: -23.5500708,
                lng: -46.4023252
            },
            {
                nome: "Casa de Cultura Hip Hop Leste",
                endereco: "Avenida Sarah Kubitschek, 165 – Cidade Tiradentes",
                telefone: "3396-0106",
                horario: "Terça a domingo das 09h às 21h",
                acessibilidade: "Espaço cultural com atividades comunitárias",
                instagram: "https://www.instagram.com/ccm.hiphopleste/",
                linktree: "https://linktr.ee/cchiphopleste",
                lat: -23.583248,
                lng: -46.406585
            },
            {
                nome: "Casa de Cultura do Hip Hop Sul",
                endereco: "Rua Sant'Ana, 201 - Vila São Pedro / Zona Sul",
                telefone: "5631-0740",
                horario: "Terça a domingo das 09h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.hiphopsul/",
                linktree: "https://linktr.ee/ccm.hiphopsul",
                lat: -23.524228,
                lng: -46.192184
            },
            {
                nome: "Casa de Cultura do Itaim Paulista",
                endereco: "Rua Monte Camberela, 490 - Vila Silva Teles / Zona Leste",
                telefone: "2963-2742",
                horario: "Terça a sábado das 09h às 21h | Domingo até 20h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.itaimpaulista/",
                linktree: "https://linktr.ee/casadeculturaitaimpaulista",
                lat: -23.497558,
                lng: -46.401711
            },
            {
                nome: "Casa de Cultura do M'Boi Mirim",
                endereco: "Avenida Inácio Dias da Silva, s/nº - M'Boi Mirim / Zona Sul",
                telefone: "5514-3408",
                horario: "Terça a domingo das 08h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.mboimirim/",
                linktree: "https://linktr.ee/ccm.mboimirim",
                lat: -23.673348,
                lng: -46.742354
            },
            {
                nome: "Casa de Cultura de Santo Amaro – Júlio Guerra",
                endereco: "Praça Floriano Peixoto, 131 - Santo Amaro / Zona Sul",
                telefone: "(11) 5523-6455",
                horario: "Terça a domingo das 10h às 18h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.julioguerra/",
                linktree: "https://linktr.ee/ccm.julioguerra",
                lat: -23.651008,
                lng: -46.707669
            },
            {
                nome: "Casa de Cultura de Santo Amaro – Manoel Mendonça",
                endereco: "Praça Dr. Francisco Ferreira Lopes, 434 - Santo Amaro / Zona Sul",
                telefone: "5522-8897",
                horario: "Terça a domingo das 09h às 21h | Segunda: 19h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.manoelmendonca/",
                linktree: "https://linktr.ee/ccm.manoelmendonca",
                lat: -23.6465493,
                lng: -46.7085136
            },
            {
                nome: "Casa de Cultura Campo Limpo – Dora Nascimento",
                endereco: "Rua Aroldo de Azevedo, 100 - Campo Limpo / Zona Sul",
                telefone: "5841-8164",
                horario: "Terça a domingo das 09h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.campolimpo/",
                linktree: "https://linktr.ee/ccampolimpo",
                lat: -23.6334144,
                lng: -46.7759046
            },
            {
                nome: "Casa de Cultura de Itaquera – Raul Seixas",
                endereco: "Rua Murmúrios da Tarde, 211 - Cohab 2 José Bonifácio - Itaquera / Zona Leste",
                telefone: "2521-6411",
                horario: "Terça a domingo das 09h às 18h",
                acessibilidade: "Informações de acessibilidade disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.raulseixas/",
                linktree: "https://linktr.ee/casadeculturaraulseixas",
                lat: -23.5533422,
                lng: -46.4435169
            },
            {
                nome: "Casa de Cultura da Freguesia do Ó Salvador Ligabue",
                endereco: "Largo da Matriz de Nossa Senhora do Ó, 215 - Freguesia do Ó / Zona Norte",
                telefone: "3931-8266",
                horario: "Terça a domingo das 09h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.freguesia/",
                linktree: "https://linktr.ee/casaculturafreguesia",
                lat: -23.5016728,
                lng: -46.6984731
            },
            {
                nome: "Casa de Cultura de São Mateus",
                endereco: "Rua Monte Mandirá, 40 - São Mateus / Zona Leste",
                telefone: "3793-1054",
                horario: "Terça a domingo das 09h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.saomateus/",
                linktree: "https://linktr.ee/ccm.saomateus",
                lat: -23.5891949,
                lng: -46.4879358
            },
            {
                nome: "Casa de Cultura de São Miguel Paulista",
                endereco: "Rua Irineu Bonardi, 169 - Vila Pedroso - São Miguel Paulista / Zona Leste",
                telefone: "2297-9177",
                horario: "Terça a domingo das 9h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.saomiguel/",
                linktree: "https://linktr.ee/casadeculturasaomiguel",
                lat: -23.495927,
                lng: -46.450469
            },
            {
                nome: "Casa de Cultura de São Rafael",
                endereco: "Rua Quaresma Delgado, 376 - Parque São Rafael / Zona Leste",
                telefone: "3793-1071",
                horario: "Terça a domingo das 9h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.saorafael/",
                linktree: "https://linktr.ee/ccm.saorafael",
                lat: -23.624771,
                lng: -46.468248
            },
            {
                nome: "Casa de Cultura do Tremembé",
                endereco: "Rua Maria Amália Lopes de Azevedo, 190 - Tremembé / Zona Norte",
                telefone: "2991-4291",
                horario: "Todos os dias das 08h às 19h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.tremembe/",
                linktree: "https://linktr.ee/ccmtremembe",
                lat: -23.456618,
                lng: -46.601887
            },
            {
                nome: "Casa de Cultura da Vila Guilherme – Casarão",
                endereco: "Praça Oscar Silva, 111 - Vila Guilherme",
                telefone: "2909-0065",
                horario: "Terça a domingo das 9h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.casarao",
                linktree: "https://linktr.ee/casadeculturavilaguilherme",
                lat: -23.5076898,
                lng: -46.6009674
            },
            {
                nome: "Casa de Cultura Cidade Ademar",
                endereco: "Avenida Durval Pinto Ferreira, 820 - Jardim Itacolomi",
                telefone: "Não informado",
                horario: "Terça a domingo das 9h às 21h",
                acessibilidade: "Informações disponíveis na unidade",
                instagram: "https://www.instagram.com/ccm.cidadeademar/",
                linktree: "",
                lat: -23.6629625,
                lng: -46.6571836
            }
        ];

        const mapa = L.map("mapa-cultural").setView([-23.5900, -46.6000], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(mapa);
        const listaUnidades = document.getElementById("lista-unidades-mapa");
        const mensagemLocalizacao = document.getElementById("mensagem-localizacao");
        const infoRota = document.getElementById("info-rota");

        let controleRota = null;
        let marcadorUsuario = null;
        const marcadoresPorNome = {};

        function criarLinkRota(unidade) {
            return `https://www.google.com/maps/dir/?api=1&destination=${unidade.lat},${unidade.lng}`;
        }

        function mostrarMensagem(texto) {
            mensagemLocalizacao.style.display = "block";
            mensagemLocalizacao.textContent = texto;
        }

        function mostrarInfoRota(texto) {
            infoRota.style.display = "block";
            infoRota.textContent = texto;
        }

        function formatarDistancia(metros) {
            if (metros >= 1000) {
                return `${(metros / 1000).toFixed(1)} km`;
            }
            return `${Math.round(metros)} m`;
        }

        function formatarTempo(segundos) {
            const minutos = Math.round((segundos / 60) * 1.35);
            if (minutos >= 60) {
                const horas = Math.floor(minutos / 60);
                const restoMinutos = minutos % 60;
                return restoMinutos === 0 ? `${horas}h` : `${horas}h ${restoMinutos}min`;
            }
            return `${minutos} min`;
        }

        function calcularDistanciaKm(origem, destino) {
            const raioTerra = 6371;
            const lat1 = origem.lat * Math.PI / 180;
            const lat2 = destino.lat * Math.PI / 180;
            const diferencaLat = (destino.lat - origem.lat) * Math.PI / 180;
            const diferencaLng = (destino.lng - origem.lng) * Math.PI / 180;

            const a = Math.sin(diferencaLat / 2) * Math.sin(diferencaLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(diferencaLng / 2) * Math.sin(diferencaLng / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return raioTerra * c;
        }

        function obterLocalizacaoUsuario() {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject("Seu navegador não suporta geolocalização.");
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    (posicao) => {
                        resolve({
                            lat: posicao.coords.latitude,
                            lng: posicao.coords.longitude
                        });
                    },
                    () => {
                        reject("Não foi possível acessar sua localização. Verifique a permissão do navegador.");
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            });
        }

        function criarLinksExtras(unidade) {
            return `
                <div class="links-unidade">
                    ${unidade.instagram ? `<a href="${unidade.instagram}" target="_blank">Instagram</a>` : ""}
                    ${unidade.linktree ? `<a href="${unidade.linktree}" target="_blank">Linktree</a>` : ""}
                    <button class="btn-rota-site" type="button">Traçar rota</button>
                    <a href="${criarLinkRota(unidade)}" target="_blank">Abrir no Maps</a>
                </div>
            `;
        }

        function criarPopup(unidade) {
            return `
                <div class="popup-mapa">
                    <h3>${unidade.nome}</h3>
                    <p><strong>Endereço:</strong> ${unidade.endereco}</p>
                    <p><strong>Telefone:</strong> ${unidade.telefone}</p>
                    <p><strong>Horário:</strong> ${unidade.horario}</p>
                    ${criarLinksExtras(unidade)}
                </div>
            `;
        }

        function classificarDistancia(distanciaKm) {
            if (distanciaKm <= 10) {
                return {
                    classe: "perto",
                    texto: "Mais perto",
                    faixa: "até 10 km"
                };
            }

            if (distanciaKm <= 18) {
                return {
                    classe: "medio",
                    texto: "Distância média",
                    faixa: "10,1 a 18 km"
                };
            }

            if (distanciaKm <= 22) {
                return {
                    classe: "longe",
                    texto: "Distante",
                    faixa: "18,1 a 22 km"
                };
            }

            return {
                classe: "muito-longe",
                texto: "Muito distante",
                faixa: "acima de 22 km"
            };
        }

        function estimarDistanciaTrajetoKm(distanciaLinhaRetaKm) {
            return distanciaLinhaRetaKm * 1.25;
        }

        function estimarTempoMotoMinutos(distanciaTrajetoKm) {
                        return Math.max(1, Math.round((distanciaTrajetoKm / 28) * 60));
        }

        function criarLegendaDistancias() {
            return `
                <div class="legenda-distancias" aria-label="Legenda das distâncias">
                    <span><strong class="bolinha perto"></strong> Até 10 km</span>
                    <span><strong class="bolinha medio"></strong> 10,1 a 18 km</span>
                    <span><strong class="bolinha longe"></strong> 18,1 a 22 km</span>
                    <span><strong class="bolinha muito-longe"></strong> Acima de 22 km</span>
                </div>
            `;
        }

        function renderizarListaUnidades(lista) {
            listaUnidades.innerHTML = "";

            const listaComDistancia = lista.some(unidade => unidade.distanciaKm !== undefined);

            if (listaComDistancia) {
                const legenda = document.createElement("div");
                legenda.innerHTML = criarLegendaDistancias();
                listaUnidades.appendChild(legenda.firstElementChild);
            }

            lista.forEach((unidade, indice) => {
                const card = document.createElement("div");
                const categoria = unidade.distanciaKm !== undefined
                    ? classificarDistancia(unidade.distanciaKm)
                    : null;

                card.className = categoria
                    ? `unidade-card unidade-card-distancia ${categoria.classe}`
                    : "unidade-card";

                const distanciaHtml = categoria
                    ? `<span class="tag-distancia ${categoria.classe}">${indice + 1}º mais perto · ${unidade.distanciaKm.toFixed(1)} km · ${unidade.tempoEstimadoMin} min · ${categoria.texto}</span>`
                    : "";

                const observacaoDistancia = categoria
                    ? `<p class="distancia-observacao">Distância aproximada de trajeto (${categoria.faixa}). O tempo real pode variar conforme trânsito e modo de transporte.</p>`
                    : "";

                card.innerHTML = `
                    <h3>${unidade.nome}</h3>
                    ${distanciaHtml}
                    ${observacaoDistancia}
                    <p><strong>Endereço:</strong> ${unidade.endereco}</p>
                    <p><strong>Telefone:</strong> ${unidade.telefone}</p>
                    <p><strong>Horário:</strong> ${unidade.horario}</p>
                    ${criarLinksExtras(unidade)}
                `;

                card.addEventListener("click", () => {
                    mapa.flyTo([unidade.lat, unidade.lng], 16);
                    marcadoresPorNome[unidade.nome].openPopup();
                });

                const botaoRotaCard = card.querySelector(".btn-rota-site");
                botaoRotaCard.addEventListener("click", (evento) => {
                    evento.stopPropagation();
                    tracarRotaAteUnidade(unidade);
                });

                listaUnidades.appendChild(card);
            });
        }

        function criarMarcadores() {
            unidadesCulturais.forEach((unidade) => {
                const marcador = L.marker([unidade.lat, unidade.lng])
                    .addTo(mapa)
                    .bindPopup(criarPopup(unidade));

                marcadoresPorNome[unidade.nome] = marcador;

                marcador.on("popupopen", () => {
                    const popupElement = marcador.getPopup().getElement();
                    const botaoRota = popupElement.querySelector(".btn-rota-site");
                    if (botaoRota) {
                        botaoRota.addEventListener("click", (evento) => {
                            evento.preventDefault();
                            tracarRotaAteUnidade(unidade);
                        });
                    }
                });
            });
        }

        async function mostrarLocalizacaoUsuario() {
            try {
                mostrarMensagem("Buscando sua localização...");
                mostrarInfoRota("Organizando as casas de cultura mais próximas de você...");

                const usuario = await obterLocalizacaoUsuario();

                if (marcadorUsuario) {
                    mapa.removeLayer(marcadorUsuario);
                }

                marcadorUsuario = L.marker([usuario.lat, usuario.lng])
                    .addTo(mapa)
                    .bindPopup("<strong>Você está aqui</strong>")
                    .openPopup();

                const unidadesOrdenadas = unidadesCulturais
                    .map(unidade => {
                        const distanciaLinhaRetaKm = calcularDistanciaKm(usuario, unidade);
                        const distanciaTrajetoKm = estimarDistanciaTrajetoKm(distanciaLinhaRetaKm);

                        return {
                            ...unidade,
                            distanciaLinhaRetaKm,
                            distanciaKm: distanciaTrajetoKm,
                            tempoEstimadoMin: estimarTempoMotoMinutos(distanciaTrajetoKm)
                        };
                    })
                    .sort((a, b) => a.distanciaKm - b.distanciaKm);

                renderizarListaUnidades(unidadesOrdenadas);
                mapa.flyTo([usuario.lat, usuario.lng], 13);

                mostrarMensagem("Localização encontrada com sucesso.");
                mostrarInfoRota("A lista foi reorganizada por proximidade. A quilometragem usa uma estimativa de trajeto; a rota real aparece ao usar Traçar rota ou Abrir no Maps.");
            } catch (erro) {
                mostrarMensagem(erro);
                mostrarInfoRota("Não foi possível reorganizar a lista sem acessar sua localização.");
            }
        }

        async function tracarRotaAteUnidade(unidade) {
            try {
                mostrarMensagem("Buscando sua localização para traçar a rota...");
                mostrarInfoRota("Calculando rota...");

                const usuario = await obterLocalizacaoUsuario();

                if (marcadorUsuario) {
                    mapa.removeLayer(marcadorUsuario);
                }

                marcadorUsuario = L.marker([usuario.lat, usuario.lng])
                    .addTo(mapa)
                    .bindPopup("<strong>Você está aqui</strong>");

                if (controleRota) {
                    mapa.removeControl(controleRota);
                }

                controleRota = L.Routing.control({
                    waypoints: [
                        L.latLng(usuario.lat, usuario.lng),
                        L.latLng(unidade.lat, unidade.lng)
                    ],
                    routeWhileDragging: false,
                    addWaypoints: false,
                    draggableWaypoints: false,
                    fitSelectedRoutes: true,
                    show: false,
                    createMarker: function () {
                        return null;
                    },
                    lineOptions: {
                        styles: [
                            {
                                color: "#6a0dad",
                                weight: 5,
                                opacity: 0.85
                            }
                        ]
                    }
                }).addTo(mapa);

                controleRota.on("routesfound", function (e) {
                    const rota = e.routes[0];
                    const distancia = formatarDistancia(rota.summary.totalDistance);
                    const tempo = formatarTempo(rota.summary.totalTime);

                    mostrarMensagem(`Rota traçada até ${unidade.nome}.`);
                    mostrarInfoRota(`Trajeto aproximado pelo serviço de rotas: ${distancia} | Tempo estimado: ${tempo}. Pode variar em relação ao Google Maps, principalmente por modo de transporte e trânsito.`);
                });

                controleRota.on("routingerror", function () {
                    mostrarInfoRota("Não foi possível calcular a rota dentro do mapa. Use o botão Abrir no Maps como alternativa.");
                });

            } catch (erro) {
                mostrarMensagem(erro);
                mostrarInfoRota("Não foi possível traçar a rota sem acessar sua localização.");
            }
        }

        criarMarcadores();
        renderizarListaUnidades(unidadesCulturais);
        document.getElementById("btn-localizacao").addEventListener("click", mostrarLocalizacaoUsuario);
}

