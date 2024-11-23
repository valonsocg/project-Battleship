import Player from "./player";
import Ship from "./ship";
import DOMHandler from "./domHandler";

const Game = (() => {
  const player1 = new Player("real");
  const player2 = new Player("computer");

  function setupBoards() {
    player1.gameboard.placeShip(new Ship(4), [0, 0], "horizontal");
    player1.gameboard.placeShip(new Ship(3), [3, 3], "vertical");
    player1.gameboard.placeShip(new Ship(2), [7, 5], "horizontal");

    player2.gameboard.placeShip(new Ship(4), [1, 1], "vertical");
    player2.gameboard.placeShip(new Ship(3), [5, 0], "horizontal");
    player2.gameboard.placeShip(new Ship(2), [8, 6], "vertical");
  }

  let currentPlayer = player1;

  function switchTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function handleAttack(coord) {
    const opponent = currentPlayer === player1 ? player2 : player1;
    const result = opponent.gameboard.receiveAttack(coord);

    DOMHandler.updateGameboards(
      player1.gameboard,
      player2.gameboard,
      "player1"
    );
    DOMHandler.updateGameboards(
      player2.gameboard,
      player1.gameboard,
      "player2"
    );

    if (opponent.gameboard.allShipsSunked()) {
      DOMHandler.displayWinner(
        currentPlayer === player1 ? "Player 1" : "Player 2"
      );
    } else {
      switchTurn();
      if (currentPlayer === player2) {
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

    DOMHandler.updateGameboards(
      player1.gameboard,
      player2.gameboard,
      "player1"
    );
    DOMHandler.updateGameboards(
      player2.gameboard,
      player1.gameboard,
      "player2"
    );

    DOMHandler.setupAttackListener((coord) => {
      if (currentPlayer === player1) {
        handleAttack(coord);
      }
    });
  }

  return { startGame };
})();

export default Game;
