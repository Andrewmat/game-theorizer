const Player = require('../Player');

class Cientist extends Player {
  constructor(name) {
    super(name);
  }

  static get ID() {
    return 'Cientist';
  }
  algorithm(history) {
    const EXP_PERIOD = 4;
    if (history.currentRoundNumber <= EXP_PERIOD) {
      return this.analyze(history.currentRoundNumber);
    }
    let oponnentCheated = history
      .first(EXP_PERIOD)
      .map(r => r.plays(this).its)
      .includes(false);
    if (oponnentCheated) {
      return history.last().plays(this).its;
    } else {
      return false;
    }
  }

  analyze(roundNumber) {
    switch (roundNumber) {
      case 1:
      case 3:
      case 4: {
        return true;
        break;
      }
      case 2: {
        return false;
        break;
      }
    }
    return null;
  }
}

module.exports = Cientist;