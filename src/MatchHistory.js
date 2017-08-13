const Round = require('./Round');

class MatchHistory {
  constructor(maxRounds) {
    this._rounds = [];
    this._maxRounds = maxRounds;
  }
  add(round) {
    this._rounds.push(round);
    return this._rounds.length < this._maxRounds;
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