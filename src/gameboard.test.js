import Gameboard from "./gameboard";
import Ship from "./ship";

describe("gameboard tests", () => {
  test("test valid coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(gameboard.grid[0][0]).toBe(ship);
    expect(gameboard.grid[0][1]).toBe(ship);
    expect(gameboard.grid[0][2]).toBe(ship);
  });

  test("test invalid coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    expect(() => {
      gameboard.placeShip(ship, [11, 11], "horizontal");
    }).toThrow("Invalid ship placement!");
  });
});
