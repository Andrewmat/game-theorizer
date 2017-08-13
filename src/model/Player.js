
class Player {
  constructor(name) {
    this._name = name;
  }
  algorithm(history) {
    throw new Error(`Implement player's logic in the algorithm`);
  }
  get name() {
    return this._name;
  }
}

class GoodGuy extends Player {
  algorithm(history) {
    return true;
  }
}
class MeanGuy extends Player {
  algorithm(history) {
    return false;
  }
}
class ReasonableGuy extends Player {
  algorithm(history) {
    if (!history.isEmpty) {
      return history.last.plays(this).its;
    } else {
      return true;
    }
  }
}

class CautiousGuy extends Player {
  algorithm(history) {
    const PERIOD = 4;
    if (history.currentIndex > PERIOD) {
      let wins = history.allRounds.slice(-PERIOD).reduce((w, round) => {
        let p = round.plays(this);
        if (p.its === true) {
          return w + 1;
        } else {
          return w;
        }
      }, 0)
      if (wins > PERIOD / 2) {
        return false;
      } else {
        return true;
      }
    } else {
      return !!(history.currentIndex % 2);
    }
  }
}

class Monkey extends Player {
  algorithm(history) {
    return Math.random() > 0.5;
  }
}

module.exports = {
  Player,
  GoodGuy,
  MeanGuy,
  ReasonableGuy,
  CautiousGuy,
  Monkey
};