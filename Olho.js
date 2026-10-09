const pupilas = document.querySelectorAll('.pupila');
const olhos = document.querySelectorAll('.olho');
const posicoesAtuais = Array.from(pupilas, () => ({ x: 0, y: 0 }));
const posicoesAlvo = Array.from(pupilas, () => ({ x: 0, y: 0 }));

window.addEventListener('mousemove', (e) => {
  olhos.forEach((olho, index) => {
    const rect = olho.getBoundingClientRect();
    const olhoX = rect.left + rect.width / 2;
    const olhoY = rect.top + rect.height / 2;

    const dx = e.clientX - olhoX;
    const dy = e.clientY - olhoY;

    const angulo = Math.atan2(dy, dx);

    const limiteMovimento = 28; 

    const x = Math.cos(angulo) * limiteMovimento;
    const y = Math.sin(angulo) * limiteMovimento;

    posicoesAlvo[index].x = x;
    posicoesAlvo[index].y = y;
  });
});

function animarPupilas() {
  pupilas.forEach((pupila, index) => {
    const posicaoAtual = posicoesAtuais[index];
    const posicaoAlvo = posicoesAlvo[index];

    posicaoAtual.x += (posicaoAlvo.x - posicaoAtual.x) * 0.13;
    posicaoAtual.y += (posicaoAlvo.y - posicaoAtual.y) * 0.13;

    pupila.style.transform = `translate(${posicaoAtual.x}px, ${posicaoAtual.y}px)`;
  });

  requestAnimationFrame(animarPupilas);
}

animarPupilas();