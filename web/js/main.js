const canvas = document.getElementById("RNGversus");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

let controllerIndex = null;
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
  position: { x: 204.8, y: 100 },
  velocity: { x: 0, y: 10 },
  imgSrc: "./assets/personajes/Martial_Hero/Sprites/Idle.png",
  flipH: false,
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
    takeHit: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Take Hit.png",
      framesMax: 4,
    },
    death: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Death.png",
      framesMax: 6,
    },
    //flipH
    idle_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Idle_flipH.png",
      framesMax: 8,
    },
    run_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Run_flipH.png",
      framesMax: 8,
    },
    jump_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Jump_flipH.png",
      framesMax: 2,
    },
    fall_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Fall_flipH.png",
      framesMax: 2,
    },
    attack1_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Attack1_flipH.png",
      framesMax: 6,
    },
    takeHit_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Take Hit_flipH.png",
      framesMax: 4,
    },
    death_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero/Sprites/Death_flipH.png",
      framesMax: 6,
    },
  },
  attackBox_normal: {
    offset: { x: 100, y: 50 },
    width: 157,
    height: 50,
  },
  attackBox_flipH: {
    offset: { x: -187, y: 50 },
    width: 157,
    height: 50,
  },
});
const player2 = new Luchador({
  position: { x: 716.8, y: 100 },
  velocity: { x: 0, y: 10 },
  imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Idle_flipH.png",
  flipH: true,
  framesMax: 4,
  scale: 2.5,
  offset: { x: 215, y: 167 },
  sprites: {
    idle: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Idle.png",
      framesMax: 4,
    },
    run: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Run.png",
      framesMax: 8,
    },
    jump: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Jump.png",
      framesMax: 2,
    },
    fall: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Take Hit.png",
      framesMax: 3,
    },
    death: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Death.png",
      framesMax: 7,
    },
    //flipH
    idle_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Idle_flipH.png",
      framesMax: 4,
    },
    run_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Run_flipH.png",
      framesMax: 8,
    },
    jump_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Jump_flipH.png",
      framesMax: 2,
    },
    fall_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Fall_flipH.png",
      framesMax: 2,
    },
    attack1_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Attack1_flipH.png",
      framesMax: 4,
    },
    takeHit_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Take Hit_flipH.png",
      framesMax: 3,
    },
    death_flipH: {
      imgSrc: "./assets/personajes/Martial_Hero_2/Sprites/Death_flipH.png",
      framesMax: 7,
    },
  },
  attackBox_normal: {
    offset: { x: 70, y: 50 },
    width: 170,
    height: 50,
  },
  attackBox_flipH: {
    offset: { x: -170, y: 50 },
    width: 170,
    height: 50,
  },
});

player1.draw();
player2.draw();

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
  c.fillStyle = "rgba(255, 255, 255, 0.15)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  player1.flipH = player1.position.x < player2.position.x ? false : true;
  player2.flipH = player2.position.x < player1.position.x ? false : true;

  //player1 movimiento
  if (keys.a.pressed && (player1.lastKey === "a" || player1.lastKey === "w")) {
    player1.velocity.x = -5;
    player1.switchSprite(player1.flipH ? "run_flipH" : "run");
  } else if (
    keys.d.pressed &&
    (player1.lastKey === "d" || player1.lastKey === "w")
  ) {
    player1.velocity.x = 5;
    player1.switchSprite(player1.flipH ? "run_flipH" : "run");
  } else {
    player1.switchSprite(player1.flipH ? "idle_flipH" : "idle");
  }
  if (player1.velocity.y < 0) {
    player1.switchSprite(player1.flipH ? "jump_flipH" : "jump");
  } else if (player1.velocity.y > 0) {
    player1.switchSprite(player1.flipH ? "fall_flipH" : "fall");
  }

  //player2 movimiento
  if (
    keys.fa.pressed &&
    (player2.lastKey === "fa" || player2.lastKey === "fw")
  ) {
    player2.velocity.x = -5;
    player2.switchSprite(player2.flipH ? "run_flipH" : "run");
  } else if (
    keys.fd.pressed &&
    (player2.lastKey === "fd" || player2.lastKey === "fw")
  ) {
    player2.velocity.x = 5;
    player2.switchSprite(player2.flipH ? "run_flipH" : "run");
  } else {
    player2.switchSprite(player2.flipH ? "idle_flipH" : "idle");
  }
  if (player2.velocity.y < 0) {
    player2.switchSprite(player2.flipH ? "jump_flipH" : "jump");
  } else if (player2.velocity.y > 0) {
    player2.switchSprite(player2.flipH ? "fall_flipH" : "fall");
  }

  //detectar colisión
  if (
    colisionRectangular({ rectangulo1: player1, rectangulo2: player2 }) &&
    player1.isAttacking &&
    player1.framesCurrent === 4
  ) {
    player2.takeHit();
    vibrar(player2);
    player1.isAttacking = false;
    gsap.to("#player2vidaInterna", { width: player2.health + "%" });
  }
  if (
    colisionRectangular({ rectangulo1: player2, rectangulo2: player1 }) &&
    player2.isAttacking &&
    player2.framesCurrent === 2
  ) {
    player1.takeHit();
    vibrar(player1);
    player2.isAttacking = false;
    gsap.to("#player1vidaInterna", { width: player1.health + "%" });
  }

  //fallar ataque
  if (player1.isAttacking && player1.framesCurrent === 4) {
    player1.isAttacking = false;
  }
  if (player2.isAttacking && player2.framesCurrent === 2) {
    player2.isAttacking = false;
  }

  //fin del juego por vida
  if (player1.health <= 0 || player2.health <= 0) {
    determinarGanador({ player1, player2, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if (!player1.dead && !player2.dead && timer > 0) {
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
        if (!player1.isJumping) {
          player1.velocity.y = -20;
          player1.isJumping = true;
        }
        break;
      case "KeyS":
        if (player1.isJumping) {
          keys.s.pressed = true;
          player1.lastKey = "s";
          player1.velocity.y = 10;
        }
        break;
      //player1 ataques
      case "KeyJ":
        if (!player1.isAttacking) {
          player1.attack();
        }
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
        if (!player2.isJumping) {
          keys.fw.pressed = true;
          player2.lastKey = "fw";
          player2.velocity.y = -20;
          player2.isJumping = true;
        }
        break;
      case "ArrowDown":
        if (player2.isJumping) {
          keys.fs.pressed = true;
          player2.lastKey = "fs";
          player2.velocity.y = 10;
        }
        break;
      //player2 movimiento
      case "Numpad1":
        if (!player2.isAttacking) {
          player2.attack();
        }
        break;
      //default
      default:
        break;
    }
  }
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
//Soporte para mando
window.addEventListener("gamepadconnected", (event) => {
  const mando = event.gamepad;
  controllerIndex = mando.index;
  console.log("Mando " + mando.index + " conectado.");
});
window.addEventListener("gamepaddisconnected", (event) => {
  const mando = event.gamepad;
  controllerIndex = null;
  console.log("Mando " + mando.index + " desconectado.");
});

function controllerInput() {
  if (navigator.getGamepads()[0] != null) {
    const mando1 = navigator.getGamepads()[0];
    const botones = mando1.buttons;
    keys.w.pressed = botones[12].pressed;
    if (botones[12].pressed || botones[0].pressed) {
      player1.lastKey = "w";
      if (!player1.isJumping) {
        player1.velocity.y = -20;
        player1.isJumping = true;
      }
    }
    keys.a.pressed = botones[14].pressed;
    if (botones[14].pressed) {
      player1.lastKey = "a";
    }
    keys.s.pressed = botones[13].pressed;
    if (botones[13].pressed) {
      if (player1.isJumping) {
        player1.lastKey = "s";
        player1.velocity.y = 10;
      }
    }
    keys.d.pressed = botones[15].pressed;
    if (botones[15].pressed) {
      player1.lastKey = "d";
    }
    if (botones[2].pressed) {
      if (!player1.isAttacking) {
        player1.attack();
      }
    }
  }
  if (navigator.getGamepads()[1] != null) {
    const mando2 = navigator.getGamepads()[1];
    const botones = mando2.buttons;
    keys.fw.pressed = botones[12].pressed;
    if (botones[12].pressed || botones[0].pressed) {
      player2.lastKey = "fw";
      if (!player2.isJumping) {
        player2.velocity.y = -20;
        player2.isJumping = true;
      }
    }
    keys.fa.pressed = botones[14].pressed;
    if (botones[14].pressed) {
      player2.lastKey = "fa";
    }
    keys.fs.pressed = botones[13].pressed;
    if (botones[13].pressed) {
      if (player2.isJumping) {
        player2.lastKey = "fs";
        player2.velocity.y = 10;
      }
    }
    keys.fd.pressed = botones[15].pressed;
    if (botones[15].pressed) {
      player2.lastKey = "fd";
    }
    if (botones[2].pressed) {
      if (!player2.isAttacking) {
        player2.attack();
      }
    }
  }
}

function vibrar(player) {
  if (navigator.getGamepads()[0] != null) {
    if (player === player1) {
      navigator.getGamepads()[0].vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 100,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0,
      });
    }
  }
  if (navigator.getGamepads()[1] != null) {
    if (player === player2) {
      navigator.getGamepads()[1].vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 100,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0,
      });
    }
  }
}

function gameLoop() {
  controllerInput();
  requestAnimationFrame(gameLoop);
}
gameLoop();
