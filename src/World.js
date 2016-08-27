
export default class World {
  constructor(livingCells) {
    this._livingCells = livingCells
  }

  livingCells() {
    return this._livingCells
  }
}
