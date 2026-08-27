const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const copyButton = document.querySelector('.copy-all');
copyButton?.addEventListener('click', async () => {
    const commands = [...document.querySelectorAll('.terminal code')]
        .map((command) => command.textContent)
        .join('\n');

    try {
        await navigator.clipboard.writeText(commands);
        copyButton.innerHTML = 'Copiado <span aria-hidden="true">✓</span>';
        setTimeout(() => {
            copyButton.innerHTML = 'Copiar tudo <span aria-hidden="true">⧉</span>';
        }, 1800);
    } catch {
        copyButton.textContent = 'Selecione os comandos';
    }
});
