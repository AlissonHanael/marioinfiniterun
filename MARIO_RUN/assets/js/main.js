const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const restart = document.querySelector('.restart')
let count = 0
let record = 0
let vivo = true
const jump = () => {
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 500)
}

iniciar()

function iniciar() {
  pontuacao()
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace('px', '')
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      vivo = false
      pipe.style.animation = 'none'
      pipe.style.left = `${pipePosition}px`
      mario.style.animation = 'none'
      mario.style.bottom = `${marioPosition}px`

      mario.src = 'assets/img/game-over.png'
      mario.style.width = '75px'
      mario.style.marginLeft = '50px'
      if (record <= count) {
        record = count
      }
      restart.classList.add('replay')
    }
    document.getElementById('pontos').innerHTML = count
    document.getElementById('recorde').innerHTML = record
  }, 10)
}

function reiniciar() {
  restart.classList.remove('replay')

  const pipePosition = -100
  const marioPosition = 0

  mario.style.bottom = `${marioPosition}px`
  mario.src = 'assets/img/mario.gif'
  mario.style.width = '150px'
  mario.style.marginLeft = '0px' //fazer variaveis global
  count = 0
  if (pipePosition <= 120 && marioPosition < 80) {
    pipe.style.left = ''
    pipe.style.animation = ''
    mario.style.animation = ''
    iniciar()
  }
  document.getElementById('pontos').innerHTML = count
  document.getElementById('recorde').innerHTML = record
}

function pontuacao() {
  while (vivo) {
    count++
  }
}

document.addEventListener('keydown', jump)
