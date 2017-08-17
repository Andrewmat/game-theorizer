'use strict';
const Round = require('./Round');

class MatchHistory {
  constructor(roundNumber) {
    this._rounds = [];
    this._roundNumber = roundNumber;
  }
  add(round) {
    if (!round instanceof Round) {
      throw new Error('The only allowed object to add to MatchHistory is Round object');
    }
    if (this._rounds.length < this._roundNumber) {
      this._rounds.push(round);
      return true;
    } else {
      return false;
    }
  }

  first(number = 1) {
    let ret = this._rounds.slice(0,number);
    if (ret.length === 1) {
      return ret[0];
    }
    return ret;
  }

  last(number = 1) {
    let ret = this._rounds.slice(-number);
    if (ret.length === 1) {
      return ret[0];
    }
    return ret;
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

  get currentRoundNumber() {
    return this._rounds.length + 1;
  }
}

module.exports = MatchHistory;