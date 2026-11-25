const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('open', !isOpen);
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const form = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = encodeURIComponent('Novo pedido de orçamento - SG Websites');
  const body = encodeURIComponent([
    'Novo pedido de orçamento',
    '',
    `Nome: ${data.get('nome')}`,
    `Empresa: ${data.get('empresa') || 'Não informado'}`,
    `E-mail: ${data.get('email')}`,
    `Telefone: ${data.get('telefone') || 'Não informado'}`,
    '',
    'Mensagem:',
    data.get('mensagem')
  ].join('\n'));

  window.location.href = `mailto:bernard0544678@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
