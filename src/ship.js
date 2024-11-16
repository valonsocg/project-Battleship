export default class Ship {
  constructor(lenght) {
    if (lenght < 1 || lenght > 4) {
      throw new Error("Invalid ship lenght. Must be between 1 and 4");
    }
    this.lenght = lenght;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.lenght) this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.lenght;
  }
}
