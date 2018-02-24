'use strict';
const Round = require('./Round');
const SingleMatch = require('./SingleMatch');
const Player = require('./Player');

describe('Round', () => {
  describe('#constructor', () => {
    it('[FAIL] Null match', () => {
      expect(() => {
        new Round(null);
      }).toThrowError();
    });

    it('[FAIL] No players in match', () => {
      expect(() => {
        new Round({players: []});
      }).toThrowError();
    });

    it('[SUCCESS] Regular round', () => {
      let match = createFakeMatch();

      expect(new Round(match))
        .toBeInstanceOf(Round);
    });
  });

  describe('#plays', () => {
    let round;
    beforeEach(() => {
      round = new Round(createFakeMatch());
    });

    it('[SUCCESS] No player, no plays', () => {
      expect(round.plays()).toEqual([]);
    });

    it('[SUCCESS] No player', () => {
      round.play([true, true]);
      expect(round.plays()).toEqual([true, true]);
    });

    it('[SUCCESS] regular path', () => {;
      round.play([true, false]);
      expect(round.plays(round._match.players[0])).toMatchObject({
        mine: true,
        its: false
      });
    });
  });
});

function createFakeMatch() {
  return new SingleMatch(1, [
    new Player(),
    new Player()
  ],{
    win: 1,
    lose: 1,
    half: 1,
    neutral: 1
  });
}