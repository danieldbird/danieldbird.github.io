const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = document.body.clientWidth;
let height = document.body.scrollHeight;
canvas.width = width;
canvas.height = height;

// fix margin appearing at the bottom of page because everything hadn't loaded yet
window.addEventListener("load", () => {
  width = document.body.clientWidth;
  height = document.body.scrollHeight;
  canvas.width = width;
  canvas.height = height;
});

// add a resize listener to update canvas size
window.addEventListener("resize", () => {
  setTimeout(() => {
    width = document.body.clientWidth;
    height = document.body.scrollHeight;
    canvas.width = width;
    canvas.height = height;
  }, 200);
});

// set defaults
const amount = 500;
const minSize = 1;
const maxSize = 3;
const minVel = 0.1;
const maxVel = 0.5;
const minAlpha = 0.5;
const maxAlpha = 1;
const color = "#a363bb";
const particles = [];

// utilities
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
  return Number(Math.random() * (max - min) + min);
}

const getRandomVelocity = (posOrNeg) => {
  if (posOrNeg) {
    if (posOrNeg === "+") {
      return getRandomFloat(minVel, maxVel);
    } else if (posOrNeg === "-") {
      return Number(-getRandomFloat(minVel, maxVel));
    }
  } else {
    if (Math.random() < 0.5) {
      return Number(-getRandomFloat(minVel, maxVel));
    }
    return getRandomFloat(minVel, maxVel);
  }
};

// create particles
function createParticles() {
  for (let i = 0; i < amount; i++) {
    particles.push({
      posX: getRandomFloat(0, width),
      posY: getRandomFloat(0, height),
      velX: getRandomVelocity(),
      velY: getRandomVelocity(),
      size: getRandomInt(minSize, maxSize),
      alpha: Number(getRandomFloat(minAlpha, maxAlpha).toFixed(2)),
    });
  }
}

createParticles();

// draw particles
function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    ctx.fillStyle = color;
    ctx.globalAlpha = particles[i].alpha;
    ctx.fillRect(
      (particles[i].posX += particles[i].velX),
      (particles[i].posY += particles[i].velY),
      particles[i].size,
      particles[i].size
    );
    if (particles[i].posX <= -maxSize) {
      particles[i].posY = getRandomFloat(0, height);
      particles[i].velX = getRandomVelocity("+");
      particles[i].velY = getRandomVelocity("+");
    }
    if (particles[i].posX >= width + maxSize) {
      particles[i].posX = width;
      particles[i].posY = getRandomFloat(0, height);
      particles[i].velX = getRandomVelocity("-");
      particles[i].velY = getRandomVelocity("-");
    }
    if (particles[i].posY <= -maxSize) {
      particles[i].posX = getRandomFloat(0, width);
      particles[i].posY = height;
      particles[i].velX = getRandomVelocity("+");
      particles[i].velY = getRandomVelocity("+");
    }

    if (particles[i].posY >= height + maxSize) {
      particles[i].posX = getRandomFloat(0, width);
      particles[i].velX = getRandomVelocity("-");
      particles[i].velY = getRandomVelocity("-");
    }
  }
  requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);
