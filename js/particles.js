const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight;

const particles = 1000;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
  return Number(Math.random() * (max - min) + min).toFixed(1);
}

function createParticle() {
  let size = getRandomInt(2, 3);
  ctx.fillStyle = "#a363bb";
  ctx.globalAlpha = getRandomFloat(0.1, 0.5);
  ctx.fillRect(
    Math.floor(Math.random() * document.body.scrollWidth),
    Math.floor(Math.random() * document.body.scrollHeight),
    size,
    size
  );
}

for (let i = 0; i < particles; i++) {
  createParticle();
}

window.addEventListener("resize", () => {
  canvas.width = document.body.scrollWidth;
  canvas.height = document.body.scrollHeight;
  for (let i = 0; i < particles; i++) {
    createParticle();
  }
});
