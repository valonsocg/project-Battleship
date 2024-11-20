export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    this.ships = [];
    this.missed = [];
  }

  isValidPlacement(row, col) {
    return (
      row >= 0 &&
      row < this.size &&
      col >= 0 &&
      col < this.size &&
      this.grid[row][col] === null
    );
  }

  placeShip(ship, coord, orientation = "horizontal") {
    const [x, y] = coord;
    const { length } = ship;

    for (let i = 0; i < length; i++) {
      const row = orientation === "horizontal" ? x : x + i;
      const col = orientation === "horizontal" ? y + i : y;

      if (!this.isValidPlacement(row, col)) {
        throw new Error("Invalid placement!");
      }

      this.grid[row][col] = "ship";
    }

    this.ships.push({ ship, coord, orientation });
  }

  receiveAttack(coord) {
    const [x, y] = coord;

    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      throw new Error("Invalid hit!");
    }

    const target = this.grid[x][y];

    if (target === "hit" || target === "miss") {
      return "Already attacked";
    }

    if (target === "ship") {
      const hitShip = this.ships.find(({ ship, coord, orientation }) =>
        this.isShipAt(coord, orientation, x, y)
      );

      if (hitShip) {
        hitShip.ship.hit();
        this.grid[x][y] = "hit";
        return "hit";
      }
    } else if (target === null) {
      this.grid[x][y] = "miss";
      this.missed.push(coord);
      return "miss";
    }
  }

  isShipAt(coord, orientation, row, col) {
    const [x, y] = coord;
    const ship = this.ships.find((ship) => ship.coord === coord);
    const { length } = ship.ship;

    for (let i = 0; i < length; i++) {
      const shipRow = orientation === "horizontal" ? x : x + i;
      const shipCol = orientation === "horizontal" ? y + i : y;

      if (shipRow === row && shipCol === col) {
        return true;
      }
    }

    return false;
  }

  allShipsSunked() {
    if (this.ships.length === 0) return true;
    return this.ships.every(({ ship }) => ship.isSunk());
  }
}
