'use strict';

class Play {
  constructor(player, play) {
    this._player = player;
    this._play = play;
  }
  get player() {
    return this._player;
  }
  get play() {
    return this._play;
  }
}

module.exports = Play;