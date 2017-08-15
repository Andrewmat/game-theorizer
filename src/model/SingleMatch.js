const MatchHistory = require('./MatchHistory');
const Round = require('./Round');
const MatchResult = require('./MatchResult');

class SingleMatch {
  constructor(roundNumber, players, { win, lose, half, neutral }) {
    this._finished = false;
    this._history = new MatchHistory(roundNumber);
    this._players = players;
    this._points = {
      win, lose, half, neutral
    }
  }

  get players() {
    return [].concat(this._players);
  }

  /**
   * How much player scores if player doesn't bet and oponnent bets
   */
  get winnerPoints() {
    return this._points.win;
  }
  /**
   * How much player scores if player bets and oponnent doesn't bet
   */
  get loserPoints() {
    return this._points.lose;
  }
  /**
   * How much player scores if both players bet
   */
  get halfPoints() {
    return this._points.half;
  }
  /**
   * How much player score if both players doesn't bet
   */
  get neutralPoints() {
    return this._points.neutral;
  }

  get finished() {
    return this._finished;
  }

  playMatch() {
    do {
      this.playRound();
    } while (this._finished === false);
    return this;
  }

  playRound() {
    let plays = this._players.map(p => p.algorithm(this._history));
    this._finished = !this._history.add(new Round(this).play(plays));
    return this;
  }

  history() {
    return this._history;
  }

  /**
   * The score of a player
   */
  playerResults(player) {
    return this.results().find(mp => mp.player === player);
  }

  results() {
    if (!this._finished) {
      throw new Error('Results is not available before the match is finished');
    }
    if (!this._matchResults) {
      this._matchResults = this._history.allRounds
        .reduce((points, round) => {
          let roundScore = this._roundScore(round);
          return [
            points[0] + roundScore[0],
            points[1] + roundScore[1]
          ];
        }, [0, 0])
        .map((points, i) => new MatchResult(this._players[i], points));
    }
    return this._matchResults;
  }

  _roundScore(round) {
    let [ play1, play2 ] = round.plays();
    if (play1 === true && play2 === false) {
      return [this._points.lose, this._points.win];
    } else if (play1 === false && play2 === true) {
      return [this._points.win, this._points.lose];
    } else if (play1 === false && play2 === false) {
      return [this._points.neutral, this._points.neutral];
    } else if (play1 === true && play2 === true) {
      return [this._points.half, this._points.half];
    }
  }
}

module.exports = SingleMatch;