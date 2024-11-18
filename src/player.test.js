import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

describe("player tests", () => {
  test("Player has a gameboard", () => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("Real player can attack opponent gameboard", () => {
    const player = new Player("real");
    const opponent = new Player("real");
    const ship = new Ship(3);

    opponent.gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(player.attack(opponent.gameboard, [0, 0])).toBe("hit");
    expect(opponent.gameboard.grid[0][0]).toBe("hit");
  });

  test("Computer generates random attack", () => {
    const computer = new Player("computer");
    const opponent = new Player("real");

    const mockReceiveAttack = jest.spyOn(opponent.gameboard, "receiveAttack");
    computer.attack(opponent.gameboard);

    expect(mockReceiveAttack).toHaveBeenCalled();
    mockReceiveAttack.mockRestore();
  });
});
