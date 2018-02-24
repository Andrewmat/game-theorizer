'use strict';
const { range, flatten, cloneDeep } = require('lodash');
const CompositeMatch = require('./CompositeMatch');

const POINT = {
  WIN: 'win',
  LOSE: 'lose',
  HALF: 'half',
  NEUTRAL: 'neutral'
};

class Evolution {
  constructor() {
    this.params = {
      players: [],
      roundNumber: 10,
      threshold: 0.5,
      points: {
        win: 3,
        lose: -1,
        half: 2,
        neutral: 0
      },
      observers: []
    };
    this.state = {
      players: this.params.players,
      match: null
    };
  }

  players(players) {
    this.params.players = flatten(players.map(arg =>
      range(arg.qtd).map(i => new arg.player(arg.player.ID + i))
    ));
    this.state.players = this.params.players;
    return this;
  }

  rounds(roundNumber) {
    this.params.roundNumber = roundNumber;
    return this;
  }

  threshold(thresholdNumber) {
    this.params.threshold = thresholdNumber;
    return this;
  }

  points({ win, lose, half, neutral }) {
    return this
      .winPoints(win)
      .losePoints(lose)
      .halfPoints(half)
      .neutralPoints(neutral);
  }

  winPoints(points) {
    return this._points(POINT.WIN, points);
  }

  losePoints(points) {
    return this._points(POINT.LOSE, points);
  }

  halfPoints(points) {
    return this._points(POINT.HALF, points);
  }

  neutralPoints(points) {
    return this._points(POINT.NEUTRAL, points);
  }

  _points(type, value) {
    if (![
        POINT.WIN,
        POINT.LOSE,
        POINT.HALF,
        POINT.NEUTRAL
      ].includes(type)) {
      throw new Error('Invalid point type given');
    }
    if (value != null) {
      this.params.points[type] = value;
    }
    return this;
  }

  observe(observer) {
    this.params.observers.push(observer);
    return this;
  }

  start(continueCondition) {
    let index = -1;
    do {
      this._combat();
      this._evolve();
      index++;
      this.params.observers.forEach(ob => ob(this.state, index));
    } while(continueCondition(this.state, index) !== false);
  }

  _combat() {
    this.state.match = new CompositeMatch(
      this.state.players,
      this.params.roundNumber,
      this.params.points
    ).play();
  }

  _evolve() {
    let lengthChosen = Math.floor(this.params.players.length * this.params.threshold);
    let best = this._sortBest(lengthChosen);

    let newcomers = range(this.params.players.length - lengthChosen)
      .map(i => cloneDeep(best[i % lengthChosen])
    );

    this.state.players = best.slice(0, lengthChosen)
      .concat(newcomers);
  }

  _sortBest(lenThreshold) {
    return this.state.match.results()
      .sort((r1, r2) => r2.score - r1.score)
      .map(r => r.player)
      .slice(0, lenThreshold);
  }
}

module.exports = Evolution;