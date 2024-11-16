import Ship from "./ship";

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    this.ships = [];
    this.missedShots = [];
  }

  placeShip(ship, coord, orientation = "horizontal") {
    const { lenght } = ship;
    const [x, y] = coord;

    for (let i = 0; i < lenght; i++) {
      const row = orientation === "horizontal" ? x : x + i;
      const col = orientation === "horizontal" ? y + i : y;

      if (row >= this.size || col >= this.size || this.grid[row][col]) {
        throw new Error("Invalid ship placement!");
      }
      this.grid[row][col] = ship;
    }

    this.ships.push(ship);
  }

  receiveAttack(coord) {
    const [x, y] = coord;
    const target = this.grid[(x, y)];

    if (target === null) {
      this.missedShots.push(coord);
      this.grid[(x, y)] = "miss";
      return false;
    } else if (target instanceof Ship) {
      target.hit();
      this.grid[(x, y)] = "hit";
      return true;
    }

    throw new Error("Invalid Attack!");
  }

  allShipsSunked() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
