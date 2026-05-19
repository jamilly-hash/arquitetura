// Menu mobile
const menuBtn = document.getElementById('menuBtn'); // Botão do menu
const navLinks = document.getElementById('navLinks'); // Lista de links de navegação
menuBtn.addEventListener('click', () => navLinks.classList.toggle('aberto')); // Alterna a classe 'aberto' para mostrar/ocultar o menu
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('aberto'))); // Fecha o menu ao clicar em um link

// Link ativo no scroll
const secoes = document.querySelectorAll('section[id]'); // Seleciona todas as seções com um ID para monitorar o scroll
const links  = document.querySelectorAll('.nav-links a[href^="#"]'); // Seleciona todos os links de navegação que apontam para seções da página
const headerHeight = document.querySelector('nav')?.offsetHeight || 80; // Altura do header para ajustar a posição de scroll, garantindo que a seção fique visível abaixo do header

function atualizarLinkAtivo() { // Função para atualizar o link ativo com base na posição de scroll
  const scrollPosition = window.scrollY + headerHeight + 30; // Posição atual do scroll ajustada para considerar a altura do header e um pequeno offset para melhor visibilidade da seção ativa
  let secaoAtual = secoes[0]; // Inicializa a seção atual como a primeira seção por padrão

  secoes.forEach(secao => {
    if (scrollPosition >= secao.offsetTop) {
      secaoAtual = secao;
    }
  });

  links.forEach(link => link.classList.remove('ativo'));
  const linkAtivo = document.querySelector(`.nav-links a[href="#${secaoAtual.id}"]`);
  if (linkAtivo) linkAtivo.classList.add('ativo');
}

window.addEventListener('scroll', atualizarLinkAtivo, { passive: true });
window.addEventListener('resize', atualizarLinkAtivo);
window.addEventListener('load', atualizarLinkAtivo);

// Animações de entrada (scroll)
const fades = document.querySelectorAll('.fade');
const obsF = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obsF.unobserve(e.target); } });
}, { threshold: 0.12 });
fades.forEach(el => obsF.observe(el));

// Hero anima imediatamente
setTimeout(() => {
  document.querySelectorAll('#inicio .fade').forEach(el => el.classList.add('vis'));
}, 150);

// Filtro da galeria
function filtrar(btn, cat) {
  document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  document.querySelectorAll('.galeria-item').forEach(item => {
    item.classList.toggle('escondido', cat !== 'todos' && item.dataset.cat !== cat);
  });
}

// Envio do formulário com mensagem de sucesso
document.querySelector('.form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: data
  });
  if (response.ok) {
    form.reset();
    document.getElementById('msg-sucesso').style.display = 'block';
    setTimeout(() => {
      document.getElementById('msg-sucesso').style.display = 'none';
    }, 5000);
  }
});


