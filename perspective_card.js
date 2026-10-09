//perspective card sobre mim

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.sobre-mim-container');
  const card = document.querySelector('.sobre-mim');

  if (container && card) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = -y / 12; 
      targetY = x / 12;
    });

    container.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function animate() {
      const ease = 0.02;
      
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      card.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

      requestAnimationFrame(animate);
    }

    animate();
  }
});