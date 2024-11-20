import Gameboard from "./gameboard";

export default class Player {
  constructor(type = "real") {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  attack(opponentGameboard, coord) {
    if (this.type === "computer") {
      coord = this.getRandomCoord(opponentGameboard.size);
    }

    return opponentGameboard.receiveAttack(coord);
  }

  getRandomCoord(size, attackedCoords = []) {
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while (attackedCoords.some((coord) => coord[0] === x && coord[1] === y));
    return [x, y];
  }
}
