import Ship from "./ship";

describe("tests for ship2", () => {
  test("is not sunk when created", () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
  });

  test("should register a hit", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("should registe isSunk as true when hit same time as its length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
