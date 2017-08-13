const Player = require('../Player');

class ReasonableGuy extends Player {
  static get ID() {
    return 'ReasonableGuy';
  }
  algorithm(history) {
    if (!history.isEmpty) {
      return history.last.plays(this).its;
    } else {
      return true;
    }
  }
}

module.exports = ReasonableGuy;