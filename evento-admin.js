document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuario || usuario.tipoUsuario !== 'Administrador') {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('eventoForm');
    const mensagem = document.getElementById('mensagemEvento');
    const descricao = document.getElementById('descricaoEvento');
    const contador = document.getElementById('contadorDescricao');
    const imagem = document.getElementById('imagemEvento');
    const nomeArquivo = document.getElementById('nomeArquivo');
    const btnSair = document.getElementById('btnSairAdmin');
    const opcoesPeriodicidade = document.querySelectorAll('.periodicity-option');

    opcoesPeriodicidade.forEach(opcao => {
        opcao.addEventListener('click', () => {
            opcoesPeriodicidade.forEach(item => item.classList.remove('active'));
            opcao.classList.add('active');
        });
    });

    descricao.addEventListener('input', () => {
        contador.textContent = `${descricao.value.length}/1000`;
    });

    imagem.addEventListener('change', () => {
        const arquivo = imagem.files[0];
        nomeArquivo.textContent = arquivo ? `Arquivo selecionado: ${arquivo.name}` : '';
    });

    btnSair.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const camposObrigatorios = [
            'nomeEvento',
            'categoriaEvento',
            'dataEvento',
            'horarioEvento',
            'localEvento',
            'descricaoEvento'
        ];

        const campoVazio = camposObrigatorios.some(id => !document.getElementById(id).value.trim());

        if (campoVazio) {
            mensagem.textContent = 'Preencha todos os campos obrigatórios antes de salvar o evento.';
            mensagem.className = 'auth-message error';
            mensagem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const arquivo = imagem.files[0];
        if (arquivo && arquivo.size > 5 * 1024 * 1024) {
            mensagem.textContent = 'A imagem deve ter no máximo 5MB.';
            mensagem.className = 'auth-message error';
            return;
        }

        const acessibilidade = Array.from(document.querySelectorAll('input[name="acessibilidade"]:checked'))
            .map(item => item.value);

        const evento = {
            periodicidade: document.querySelector('input[name="periodicidade"]:checked').value,
            nome: document.getElementById('nomeEvento').value.trim(),
            categoria: document.getElementById('categoriaEvento').value,
            data: document.getElementById('dataEvento').value,
            horario: document.getElementById('horarioEvento').value,
            local: document.getElementById('localEvento').value.trim(),
            descricao: descricao.value.trim(),
            imagem: arquivo ? arquivo.name : '',
            acessibilidade,
            outrosAcessibilidade: document.getElementById('outrosAcessibilidade').value.trim(),
            criadoPor: usuario.email,
            criadoEm: new Date().toISOString()
        };

        const eventosAdmin = JSON.parse(localStorage.getItem('eventosAdmin')) || [];
        eventosAdmin.push(evento);
        localStorage.setItem('eventosAdmin', JSON.stringify(eventosAdmin));

        /*
            Preparado para backend SQL:
            trocar o localStorage acima por um fetch para a API do backend.

            fetch('/api/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evento)
            });
        */

        mensagem.textContent = 'Evento salvo com sucesso! Quando o backend SQL estiver pronto, estes dados poderão ser enviados para o banco.';
        mensagem.className = 'auth-message success';
        form.reset();
        contador.textContent = '0/1000';
        nomeArquivo.textContent = '';
        opcoesPeriodicidade.forEach(item => item.classList.remove('active'));
        opcoesPeriodicidade[0].classList.add('active');
    });
});
