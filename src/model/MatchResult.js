
class MatchResult {
  constructor(player, score = 0) {
    this._player = player;
    this._score = score;
  }

  get player() {
    return this._player;
  }

  set score(score) {
    this._score = score;
  }

  changeScore(score) {
    this._score += score;
    return this;
  }

  get score() {
    return this._score;
  }
}

module.exports = MatchResult;