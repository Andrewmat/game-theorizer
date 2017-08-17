'use strict';

class Player {
  constructor(name) {
    this._name = name;
  }
  algorithm(history) {
    throw new Error(`Implement player's logic in the algorithm`);
  }
  static get ID() {
    return 'Player';
  }
  get name() {
    return this._name;
  }
}

module.exports = Player;