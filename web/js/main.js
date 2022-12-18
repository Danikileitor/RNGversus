const canvas = document.getElementById("RNGversus");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const background = new Sprite({
  position: { x: 0, y: 0 },
  imgSrc: "./assets/oak_woods/background.png",
});
const shop = new Sprite({
  position: { x: 625, y: 128 },
  imgSrc: "./assets/oak_woods/shop.png",
  scale: 2.75,
  framesMax: 6,
});

const player1 = new Luchador({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 10 },
  offset: { x: 0, y: 0 },
  imgSrc: "./assets/personajes/Martial_Hero/Sprites/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: { x: 215, y: 157 },
  sprites: {
    idle: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Idle.png",
      framesMax: 8,
    },
    run: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Run.png",
      framesMax: 8,
    },
    jump: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Jump.png",
      framesMax: 2,
    },
    fall: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Attack1.png",
      framesMax: 6,
    },
  },
});
const player2 = new Luchador({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 10 },
  color: "blue",
  offset: { x: -50, y: 0 },
});

player1.draw();
player2.draw();

console.log(player1);
console.log(player2);

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  s: { pressed: false },
  fa: { pressed: false },
  fd: { pressed: false },
  fw: { pressed: false },
  fs: { pressed: false },
};

reducirTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player1.update();
  //player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  //player1 movimiento
  if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -5;
    player1.switchSprite("run");
  } else if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = 5;
    player1.switchSprite("run");
  } else {
    player1.switchSprite("idle");
  }
  if (player1.velocity.y < 0) {
    player1.switchSprite("jump");
  } else if (player1.velocity.y > 0) {
    player1.switchSprite("fall");
  }

  //player2 movimiento
  if (keys.fa.pressed && player2.lastKey === "fa") {
    player2.velocity.x = -5;
  } else if (keys.fd.pressed && player2.lastKey === "fd") {
    player2.velocity.x = 5;
  }

  //detectar colisión
  if (
    colisionRectangular({ rectangulo1: player1, rectangulo2: player2 }) &&
    player1.isAttacking
  ) {
    player1.isAttacking = false;
    console.log("player1 hace daño a player2");
    player2.health -= 10;
    document.getElementById("player2vidaInterna").style.width =
      player2.health + "%";
  }
  if (
    colisionRectangular({ rectangulo1: player2, rectangulo2: player1 }) &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    console.log("player2 hace daño a player1");
    player1.health -= 10;
    document.getElementById("player1vidaInterna").style.width =
      player1.health + "%";
  }

  //fin del juego por vida
  if (player1.health <= 0 || player2.health <= 0) {
    determinarGanador({ player1, player2, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    //player1 movimiento
    case "KeyD":
      keys.d.pressed = true;
      player1.lastKey = "d";
      break;
    case "KeyA":
      keys.a.pressed = true;
      player1.lastKey = "a";
      break;
    case "KeyW":
      keys.w.pressed = true;
      player1.lastKey = "w";
      player1.velocity.y = -20;
      break;
    case "KeyS":
      keys.s.pressed = true;
      player1.lastKey = "s";
      player1.velocity.y = 10;
      break;
    //player1 ataques
    case "KeyJ":
      player1.attack();
      break;
    //player2 movimiento
    case "ArrowRight":
      keys.fd.pressed = true;
      player2.lastKey = "fd";
      break;
    case "ArrowLeft":
      keys.fa.pressed = true;
      player2.lastKey = "fa";
      break;
    case "ArrowUp":
      keys.fw.pressed = true;
      player2.lastKey = "fw";
      player2.velocity.y = -20;
      break;
    case "ArrowDown":
      keys.fs.pressed = true;
      player2.lastKey = "fs";
      player2.velocity.y = 10;
      break;
    //player2 movimiento
    case "Numpad1":
      player2.attack();
      break;
    //default
    default:
      break;
  }
  console.log(event.code);
});
window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "KeyS":
      keys.s.pressed = false;
      break;

    case "ArrowRight":
      keys.fd.pressed = false;
      break;
    case "ArrowLeft":
      keys.fa.pressed = false;
      break;
    case "ArrowUp":
      keys.fw.pressed = false;
      break;
    case "ArrowDown":
      keys.fs.pressed = false;
      break;

    default:
      break;
  }
});
