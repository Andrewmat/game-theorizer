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
  playerScore(player) {
    return this.score()[this._players.indexOf(player)];
  }

  score() {
    return this._history.allRounds.reduce((points, round) => {
      let roundScore = this._roundScore(round);
      return [
        points[0] + roundScore[0],
        points[1] + roundScore[1]
      ];
    }, [0, 0]);
  }

  _roundScore(round) {
    let [ play1, play2 ] = round.plays();
    if (play1 === true && play2 === false) {
      return [this._loserPoints, this._winnerPoints];
    } else if (play1 === false && play2 === true) {
      return [this._winnerPoints, this._loserPoints];
    } else if (play1 === false && play2 === false) {
      return [this._neutralPoints, this._neutralPoints];
    } else if (play1 === true && play2 === true) {
      return [this._halfPoints, this._halfPoints];
    }
  }
}

module.exports = Match;