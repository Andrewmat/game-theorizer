const Play = require('./Play');

class Round {
  constructor(match) {
    if (match == null) {
      throw new Error('Round must receive its match');
    }
    if (match.players.length < 2) {
      throw new Error('Round must receive a match with at least 2 players');
    }
    this._match = match;
    this._plays = null;
    this._played = false;
  }

  plays(player) {
    return {
      mine: this._plays.find(p => p.player === player).play,
      its: this._plays.find(p => p.player !== player).play
    };
  }

  play(plays) {
    if (this._played) {
      throw new Error('Round already played');
    }
    if (plays.length !== this._match.players.length) {
      throw new Error(`There must be the same number of plays (${plays.length}) and players (${this._match.players.length}) per round`);
    }
    this._plays = plays.map((p, i) => new Play(this._match.players[i], p));
    this._played = true;
    return this;
  }
}

module.exports = Round;