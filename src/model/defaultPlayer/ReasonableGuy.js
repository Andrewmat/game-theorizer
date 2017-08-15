const Player = require('../Player');

class ReasonableGuy extends Player {
  static get ID() {
    return 'ReasonableGuy';
  }
  algorithm(history) {
    if (history.isEmpty) {
      return true;
    }
    return history.last().plays(this).its;
  }
}

module.exports = ReasonableGuy;