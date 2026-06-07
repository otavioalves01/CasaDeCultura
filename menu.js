// MENU RESPONSIVO GLOBAL
// Controla o menu hambúrguer em TODAS as páginas, inclusive painel administrativo.
(function () {
    function fecharMenu(navbar) {
        const botao = navbar.querySelector('.hamburger-menu');
        const links = navbar.querySelector('.nav-links');
        if (!botao || !links) return;
        links.classList.remove('show-menu');
        botao.classList.remove('is-open');
        botao.setAttribute('aria-expanded', 'false');
    }

    function iniciarMenus() {
        document.querySelectorAll('.navbar').forEach((navbar) => {
            const botao = navbar.querySelector('.hamburger-menu');
            const links = navbar.querySelector('.nav-links');
            if (!botao || !links || botao.dataset.menuGlobalAplicado === 'true') return;

            botao.dataset.menuGlobalAplicado = 'true';

            botao.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const aberto = !links.classList.contains('show-menu');

                // Fecha outros menus antes de abrir este.
                document.querySelectorAll('.navbar').forEach((outraNavbar) => {
                    if (outraNavbar !== navbar) fecharMenu(outraNavbar);
                });

                links.classList.toggle('show-menu', aberto);
                botao.classList.toggle('is-open', aberto);
                botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
            });

            links.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', () => fecharMenu(navbar));
            });
        });
    }

    document.addEventListener('DOMContentLoaded', iniciarMenus);

    document.addEventListener('click', (event) => {
        document.querySelectorAll('.navbar').forEach((navbar) => {
            if (!navbar.contains(event.target)) fecharMenu(navbar);
        });
    });
})();
