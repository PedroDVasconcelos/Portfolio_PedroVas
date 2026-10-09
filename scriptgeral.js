// biblioteca digitação
if (typeof Typed !== 'undefined') {
  const typedStrings = document.documentElement.lang === 'en'
    ? ['Aspiring Developer', 'Future Full-Stack Developer']
    : ['Programador em formação', 'Futuro Dev Full-Stack'];

  new Typed('#typed', {
    strings: typedStrings,
    typeSpeed: 70,
    backSpeed: 40,
    loop: true
  });
}

//letras flutuantes efeito ondas
const letras = document.querySelectorAll('.letra-h1');
const letras2 = document.querySelectorAll('.span-SobreMim')
const lis = document.querySelectorAll('.li-LSH')
const letras3 = document.querySelectorAll('.letra-h1-Skills')
const letras4 = document.querySelectorAll('.h1-projetos-span')

letras.forEach((letra, index) => {
  letra.style.animationDelay = `${index * 0.1}s`;
});

letras2.forEach((letra, index) =>{
  letra.style.animationDelay = `${index * 0.1}s`;
})

lis.forEach((li, index) =>{
  li.style.animationDelay = `${index * 0.4}s`;
})

letras3.forEach((letra, index) =>{
  letra.style.animationDelay = `${index * 0.1}s`;
})

letras4.forEach((letra, index) =>{
  letra.style.animationDelay = `${index * 0.1}s`;
})

// dropdown header idioma
const li = document.getElementById('li-idioma');
const dropdown = document.getElementById('dropdown-ID');

if (li && dropdown) {
  li.addEventListener('click', () =>{
      dropdown.classList.toggle('active');
  })
}

const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a, li').forEach((item) => {
    item.addEventListener('click', () => {
      if (item.closest('#li-idioma, #dropdown-ID')) return;

      if (window.innerWidth <= 900) {
        mainNav.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

//card aparecimento

document.addEventListener('DOMContentLoaded', () => {
  // Mapeamento dos IDs dos cards
  const cardsMap = {
    js: document.getElementById('jsLi'),
    html: document.getElementById('htmlLi'),
    css: document.getElementById('cssLi'),
    node: document.getElementById('nodeLi'),
    git: document.getElementById('gitLi'),
    github: document.getElementById('githubLi'),
    csharp: document.getElementById('csharpLi'),
    figma: document.getElementById('figmaLi'),
    ux: document.getElementById('uxLi'),
    sql: document.getElementById('sqlLi'),
    vs: document.getElementById('vsLi'),
    vsc: document.getElementById('vsCLi'),
    api: document.getElementById('apiLi')
  };

  const todosOsCards = Object.values(cardsMap).filter(Boolean);

  function mostrarCardPorChave(key) {
    const cardAlvo = cardsMap[key];
    if (!cardAlvo) return;

    todosOsCards.forEach(card => {
      card.classList.remove('card-visivel', 'aparecimento1');
      card.style.opacity = '0';
    });

    cardAlvo.classList.add('card-visivel');
    cardAlvo.style.opacity = '1';
  }

  // Ouvinte de clique na Esfera e na fonte original
  const containers = [
    document.querySelector('.sphere-container'),
    document.getElementById('html-skills-source'),
    document.querySelector('.skills-div')
  ];

  containers.forEach(container => {
    if (!container) return;

    container.addEventListener('click', (event) => {
      const elementoClicado = event.target.closest('.skill-item, img, div, a, span');
      if (!elementoClicado) return;

      // Identifica a skill pelo ID, Classe ou Alt da Imagem
      const textoIdentificador = (
        elementoClicado.id + ' ' + 
        elementoClicado.className + ' ' + 
        (elementoClicado.getAttribute('alt') || '') + ' ' +
        (elementoClicado.getAttribute('src') || '')
      ).toLowerCase();

      if (textoIdentificador.includes('js')) mostrarCardPorChave('js');
      else if (textoIdentificador.includes('html')) mostrarCardPorChave('html');
      else if (textoIdentificador.includes('css')) mostrarCardPorChave('css');
      else if (textoIdentificador.includes('node')) mostrarCardPorChave('node');
      else if (textoIdentificador.includes('github')) mostrarCardPorChave('github');
      else if (textoIdentificador.includes('git')) mostrarCardPorChave('git');
      else if (textoIdentificador.includes('csharp') || textoIdentificador.includes('c#')) mostrarCardPorChave('csharp');
      else if (textoIdentificador.includes('figma')) mostrarCardPorChave('figma');
      else if (textoIdentificador.includes('uiux') || textoIdentificador.includes('ux')) mostrarCardPorChave('ux');
      else if (textoIdentificador.includes('sql')) mostrarCardPorChave('sql');
      else if (textoIdentificador.includes('visualstudio') || textoIdentificador.includes('vsc')) mostrarCardPorChave('vsc');
      else if (textoIdentificador.includes('vscode') || textoIdentificador.includes('vs')) mostrarCardPorChave('vs');
      else if (textoIdentificador.includes('api')) mostrarCardPorChave('api');
    });
  });
});

const formPort = document.forms.namedItem('formPort');

if (formPort) {
  formPort.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(formPort.action, {
        method: formPort.method,
        body: new FormData(formPort),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Falha ao enviar formulário: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  });
}

const btn_Form = document.getElementById('btn-enviar');
const p_retonro = document.getElementById('msg-retorno');

btn_Form.addEventListener('click', () =>{
  p_retonro.style.display = 'block';
})

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav li');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (link.closest('#li-idioma, #dropdown-ID')) return;

                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }
});

//ir rapido para a section, botoes no header

[
  ['li-list-navI', 'ganchoI'],
  ['li-list-navS', 'gancho_SobreMim'],
  ['li-list-navSk', 'gancho_Skills'],
  ['li-list-navP', 'gancho_projetos'],
  ['li-list-navM', 'gancho_MinhasRedes'],
  ['li-list-navC', 'gancho_Contato']
].forEach(([idMenu, idDestino]) => {
  const itemMenu = document.getElementById(idMenu);
  const destino = document.getElementById(idDestino);
  if (!itemMenu || !destino) return;

  itemMenu.addEventListener('click', () => {
    const secaoDestino = destino.closest('section') || destino;
    secaoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
