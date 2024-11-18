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

  getRandomCoord(size) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    return [x, y];
  }
}
