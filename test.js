const SingleMatch = require('./src/model/SingleMatch');
const CompositeMatch = require('./src/model/CompositeMatch');
const dftPlayer = require('./src/service/DefaultPlayers');

var players = [
  new dftPlayer.GoodGuy('Good'),
  new dftPlayer.MeanGuy('Mean'),
  new dftPlayer.ReasonableGuy('Reasonable'),
  new dftPlayer.Monkey('Monkey')
];

var match = new CompositeMatch(players, 50, {
  win: 4,
  lose: 0,
  half: 3,
  neutral: 2
}).play();

match.results().sort((r1, r2) => r1.score - r2.score).forEach(r => {
  console.log(`${r.player.name}: ${r.score}`);
})