import Gameboard from "./gameboard";
import Ship from "./ship";

describe("gameboard tests", () => {
  test("invalid placement", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();
    expect(() => gameboard.placeShip(ship, [11, 11], "horizontal")).toThrow(
      "Invalid placement!"
    );
  });

  test("valid horizontal placement contains ship on cells", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, [1, 2], "horizontal");
    expect(gameboard.grid[1][2]).toBe("ship");
    expect(gameboard.grid[1][3]).toBe("ship");
    expect(gameboard.grid[1][4]).toBe("ship");
  });

  test("valid vertical placement contains ship on cells", () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, [1, 2], "vertical");
    expect(gameboard.grid[1][2]).toBe("ship");
    expect(gameboard.grid[2][2]).toBe("ship");
    expect(gameboard.grid[3][2]).toBe("ship");
  });

  test("invalid placement trying to place a ship on existing ship", () => {
    const ship = new Ship(3);
    const ship2 = new Ship(2);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, [1, 2], "vertical");
    expect(() => gameboard.placeShip(ship2, [1, 2], "horizontal")).toThrow(
      "Invalid placement!"
    );
  });

  test("receiveAttack records a hit", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], "horizontal");

    expect(gameboard.receiveAttack([0, 0])).toBe("hit");
    expect(gameboard.grid[0][0]).toBe("hit");
  });

  test("receiveAttack records a miss", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], "horizontal");

    expect(gameboard.receiveAttack([4, 5])).toBe("miss");
    expect(gameboard.grid[4][5]).toBe("miss");
  });

  test("receiveAttack prevents multiple attacks on the same cell", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack([3, 3]);
    expect(gameboard.receiveAttack([3, 3])).toBe("Already attacked");
  });

  test("receiveAttack out of bound", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.receiveAttack([11, 11])).toThrow("Invalid hit!");
  });

  test("allShipsSunked returns true when all ships are sunk", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, [0, 0], "horizontal");
    gameboard.placeShip(ship2, [1, 0], "horizontal");

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([1, 0]);
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);

    expect(gameboard.allShipsSunked()).toBe(true);
  });

  test("allShipsSunked returns false when some ships are still afloat", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, [0, 0], "horizontal");
    gameboard.placeShip(ship2, [1, 0], "horizontal");

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([1, 0]);

    expect(gameboard.allShipsSunked()).toBe(false);
  });
});
