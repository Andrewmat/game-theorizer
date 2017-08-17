'use strict';
const { range, flatten, cloneDeep } = require('lodash');
const CompositeMatch = require('./CompositeMatch');

class Evolution {
  constructor(playersObj, roundNumber = 10, points = {
      win: 3,
      lose: -1,
      half: 2,
      neutral: 0}) {
    let players = flatten(playersObj.map(p =>
      range(p.qtd).map(i => new p.player(p.player.ID + i))
    ));
    console.log(' --- CONTRCT ---');
    console.log(players);
    console.log(' --- CONTRCT ---');
    this.params = {
      players,
      roundNumber,
      points
    };
    this.state = {
      players: this.params.players,
      match: null
    };
  }

  start(stop, observe) {
    let index = -1;
    do {
      this._combat();
      this._evolve(0.85);
      index++;
      observe(this.state, index);
    } while(stop(this.state, index) !== true);
  }

  _combat() {
    this.state.match = new CompositeMatch(
      this.state.players,
      this.params.roundNumber,
      this.params.points
    ).play();
  }

  _evolve(threshold = 0.5) {
    let lenThreshold = Math.floor(this.params.players.length * threshold);
    let best = this._sortBest(lenThreshold);

    let newcomers = range(this.params.players.length - lenThreshold)
      .map(i => cloneDeep(best[i % lenThreshold])
    );

    this.state.players = best.slice(0, lenThreshold)
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