'use strict';
const SingleMatch = require('./SingleMatch');
const MatchResult = require('./MatchResult');

class CompositeMatch {
  constructor(players, roundNumber, { win, lose, half, neutral }) {
    this._players = players;
    this._roundNumber = roundNumber;
    this._points = {
      win,
      lose,
      half,
      neutral
    };
    this._matches = [];
    this._finished = false;
  }

  get players() {
    return [].concat(this._players);
  }

  get finished() {
    return this._finished;
  }

  play() {
    this._matches = this._players.map((p1, i) => {
      return this._players.slice(i+1).map(p2 =>
        new SingleMatch(this._roundNumber, [p1, p2], this._points).playMatch()
      );
    }).reduce((flat, arr) => flat.concat(arr), []);
    this._finished = true;
    return this;
  }

  results() {
    if (!this._finished) {
      throw new Error('Results is not available before the match is finished');
    }
    if (!this._compositeResults) {
      let compositeResults = this._players.map(p => new MatchResult(p));
      this._matches
        .map(match => match.results())
        .reduce((flat, arr) => flat.concat(arr), [])
        .forEach(sResult => {
          compositeResults.find(cResult => cResult.player === sResult.player).changeScore(sResult.score);
        });
        this._compositeResults = compositeResults;
      }
      return this._compositeResults;
  }
}

module.exports = CompositeMatch;