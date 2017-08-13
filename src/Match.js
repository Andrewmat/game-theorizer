const MatchHistory = require('./MatchHistory');
const Round = require('./Round');

class Match {
  constructor(maxRounds, players, { win, lose, half, neutral }) {
    this._finished = false;
    this._history = new MatchHistory(maxRounds);
    this._players = players;
    this._winnerPoints = win;
    this._loserPoints = lose;
    this._halfPoints = half;
    this._neutralPoints = neutral;
  }

  get players() {
    return [].concat(this._players);
  }

  /**
   * How much player scores if player doesn't bet and oponnent bets
   */
  get winnerPoints() {
    return this._winnerPoints;
  }
  /**
   * How much player scores if player bets and oponnent doesn't bet
   */
  get loserPoints() {
    return this._loserPoints;
  }
  /**
   * How much player scores if both players bet
   */
  get halfPoints() {
    return this._halfPoints;
  }
  /**
   * How much player score if both players doesn't bet
   */
  get neutralPoints() {
    return this._neutralPoints;
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

  // only accessable after match is finished
  history() {
    if (this._finished) {
      return this._history;
    } else {
      return null;
    }
  }

  /**
   * The score of a player
   */
  score(player) {
    return this._history.allRounds.reduce((points, round) => {
      let play = round.plays(player);
      if (play.mine === true && play.its === true) {
        return points + this._halfPoints;
      } else if (play.mine === false && play.its === false) {
        return points + this._neutralPoints;
      } else if (play.mine === true && play.its === false) {
        return points + this._winnerPoints;
      } else {
        return points + this._loserPoints;
      }
    }, 0);
  }
}

module.exports = Match;