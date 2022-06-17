const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restart = document.querySelector(".restart");
const menu = document.querySelector(".menu");
const jumpSound = new Audio("assets/sound/mario_jump.wav");
const deadSound = document.getElementById("mario_dead");
let speed = 1500;
let count = 0;
let record = 0;
const maxSpeed = 750;
var pulo = false;

menu.classList.remove("menu");
document.addEventListener("keydown", jump);

function jump(e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (pulo == true) {
      return;
    }
    jumpSound.play();
    pulo = true;
    mario.classList.add("jump");
    setTimeout(() => {
      pulo = false;
      mario.classList.remove("jump");
    }, 500);
  }
}

iniciar();

function iniciar() {
  pipe.classList.add("animated");

  deadSound.addEventListener("ended", () => {
    restart.classList.add("replay");
    menu.classList.add("menu");
  });
  const pontuacao = setInterval(() => {
    count++;
  }, 500);

  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove("animated");
      pipe.style.left = `${pipePosition}px`;
      mario.style.bottom = `${marioPosition}px`;

      if (deadSound) {
        deadSound.play();
      }
      mario.classList.remove("mario");
      mario.classList.add("morto");
      if (record <= count) {
        record = count;
      }
      clearInterval(loop);
      clearInterval(pontuacao);
    }
    document.getElementById("score").innerHTML = count;
    document.getElementById("record").innerHTML = record;
  }, 10);
}

function reiniciar() {
  restart.classList.remove("replay");
  menu.classList.remove("menu");
  mario.classList.remove("morto");
  mario.classList.add("mario");
  count = 0;
  pipe.style.left = ""; // reseta para posicao inicial
  pipe.style.animation = ""; // reseta para posicao inicial
  mario.style.animation = ""; // reseta para posicao inicial
  mario.style.bottom = ""; // reseta para posicao inicial
  iniciar();

  document.getElementById("score").innerHTML = count;
  document.getElementById("record").innerHTML = record;
}
