function colisionRectangular({ rectangulo1, rectangulo2 }) {
  return (
    rectangulo1.attackBox.position.x + rectangulo1.attackBox.width >=
      rectangulo2.position.x &&
    rectangulo1.attackBox.position.x <=
      rectangulo2.position.x + rectangulo2.width &&
    rectangulo1.attackBox.position.y + rectangulo1.attackBox.height >=
      rectangulo2.position.y &&
    rectangulo1.attackBox.position.y <=
      rectangulo2.position.y + rectangulo2.height
  );
}

function determinarGanador({ player1, player2, timerId }) {
  clearTimeout(timerId);
  document.getElementById("resultado").style.display = "flex";
  if (player1.health === player2.health) {
    document.getElementById("resultado").innerHTML = "Empate";
  } else if (player1.health > player2.health) {
    document.getElementById("resultado").innerHTML = "Victoria para Jugador1";
  } else {
    document.getElementById("resultado").innerHTML = "Victoria para Jugador2";
  }
}

let timer = 60;
let timerId;
function reducirTimer() {
  if (timer > 0) {
    timerId = setTimeout(reducirTimer, 1000);
    timer--;
    document.getElementById("timer").innerHTML = timer;
  }
  if (timer === 0) {
    determinarGanador({ player1, player2, timerId });
  }
}
