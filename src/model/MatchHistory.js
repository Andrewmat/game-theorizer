const Round = require('./Round');

class MatchHistory {
  constructor(roundNumber) {
    this._rounds = [];
    this._roundNumber = roundNumber;
  }
  add(round) {
    if (this._rounds.length < this._roundNumber) {
      this._rounds.push(round);
      return true;
    } else {
      return false;
    }
  }

  get first() {
    return this._rounds[0];
  }

  get last() {
    return this._rounds[this._rounds.length - 1];
  }

  get length() {
    return this._rounds.length;
  }

  get isEmpty() {
    return this._rounds.length === 0;
  }

  get allRounds() {
    return [].concat(this._rounds);
  }

  get currentIndex() {
    return this._rounds.length + 1;
  }
}

module.exports = MatchHistory;