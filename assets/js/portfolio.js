const botao = document.getElementById('botaoTema');
const icone = document.getElementById('iconeTema');
const textoBotao = document.getElementById('textoBotao');
const mensagem = document.getElementById('mensagem');
const aplicarTema = (escuro) => {
  document.body.classList.toggle('escuro', escuro);
  icone.textContent = escuro ? '☀' : '☾';
  textoBotao.textContent = escuro ? 'Modo claro' : 'Modo escuro';
  mensagem.textContent = escuro ? 'Estamos no modo escuro.' : 'Estamos no modo claro.';
  botao.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
};
let temaSalvo = null;
try { temaSalvo = localStorage.getItem('portfolio-tema'); } catch (_) {}
aplicarTema(temaSalvo === 'escuro');
botao.addEventListener('click', () => {
  const escuro = !document.body.classList.contains('escuro');
  aplicarTema(escuro);
  try { localStorage.setItem('portfolio-tema', escuro ? 'escuro' : 'claro'); } catch (_) {}
});
const cursor = document.getElementById('cursor');
if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('mousemove', (evento) => {
    cursor.style.left = `${evento.clientX}px`;
    cursor.style.top = `${evento.clientY}px`;
    cursor.classList.add('visivel');
  });
  document.addEventListener('mouseout', (evento) => { if (!evento.relatedTarget) cursor.classList.remove('visivel'); });
}
document.getElementById('anoAtual').textContent = new Date().getFullYear();
document.querySelectorAll('#menuPrincipal .nav-link').forEach((link) => link.addEventListener('click', () => {
  const menu = document.getElementById('menuPrincipal');
  if (window.bootstrap && menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));
document.getElementById('formContato').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const dados = new FormData(evento.currentTarget);
  const nome = String(dados.get('nome')).trim();
  const email = String(dados.get('email')).trim();
  const assunto = String(dados.get('assunto')).trim();
  const mensagem = String(dados.get('mensagem')).trim();
  const destinatario = 'araujoo.bianca007@gmail.com'; 
  const status = document.getElementById('statusContato');
  if (!destinatario) {
    status.textContent = 'Configure seu endereço de e-mail no arquivo assets/js/portfolio.js para habilitar o envio.';
    return;
  }
  const corpo = `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;
  window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  status.textContent = 'Seu aplicativo de e-mail será aberto para concluir o envio.';
});
