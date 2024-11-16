import Ship from "./ship";

describe("Ship class tests", () => {
  test("Reject invalid ship lenght", () => {
    expect(() => new Ship(5)).toThrow(
      "Invalid ship lenght. Must be between 1 and 4"
    );
  });

  test("isSunk() should return false for a new ship", () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
  });

  test("hit() register hit and affects isSunk", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("isSunk() works with a ship of lenght 1", () => {
    const ship = new Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
