import DOMHandler from "./domHandler";
import Player from "./player";
import Ship from "./ship";

const Game = (() => {
  const player = new Player("real");
  const computer = new Player("computer");

  function setupBoards() {
    player.gameboard.placeShip(new Ship(4), [0, 0], "horizontal");
    player.gameboard.placeShip(new Ship(3), [3, 3], "vertical");
    player.gameboard.placeShip(new Ship(2), [7, 5], "horizontal");

    computer.gameboard.placeShip(new Ship(4), [1, 1], "vertical");
    computer.gameboard.placeShip(new Ship(3), [5, 0], "horizontal");
    computer.gameboard.placeShip(new Ship(2), [8, 6], "vertical");
  }

  let currentPlayer = player;

  function switchTurn() {
    currentPlayer = currentPlayer === player ? computer : player;
  }

  function handleAttack(coord) {
    const opponent = currentPlayer === player ? computer : player;
    const result = opponent.gameboard.receiveAttack(coord);

    DOMHandler.updateGameboard(opponent.gameboard, "opponent");
    DOMHandler.updateGameboard(currentPlayer.gameboard, "player");

    if (opponent.gameboard.allShipsSunked()) {
      DOMHandler.displayWinner(
        currentPlayer === player ? "player" : "computer"
      );
    } else {
      switchTurn();
      if (currentPlayer === computer) {
        setTimeout(() => {
          const randomCoord = currentPlayer.getRandomCoord(
            opponent.gameboard.size,
            opponent.gameboard.missed
          );
          handleAttack(randomCoord);
        }, 1000);
      }
    }
  }

  function startGame() {
    setupBoards();

    const opponent = computer;
    DOMHandler.renderGameboard(player.gameboard, "player");
    DOMHandler.renderGameboard(opponent.gameboard, "opponent");

    DOMHandler.setupAttackListener((coord) => {
      if (currentPlayer === player) {
        handleAttack(coord);
      }
    });
  }

  return { startGame };
})();

export default Game;
