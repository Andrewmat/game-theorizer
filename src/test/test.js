const SingleMatch = require('./src/model/SingleMatch');
const CompositeMatch = require('./src/model/CompositeMatch');
const dftPlayer = require('./src/service/DefaultPlayers');

var players = [
  new dftPlayer.ReasonableGuy('CopyCat'),
  new dftPlayer.MeanGuy('AlwaysCheat'),
  new dftPlayer.GoodGuy('AlwaysCoop'),
  new dftPlayer.SpitefulGuy('Grudger'),
  new dftPlayer.Cientist('Detective')
];

var match = new CompositeMatch(players, 10, {
  win: 3,
  lose: -1,
  half: 2,
  neutral: 0
}).play();

match.results().sort((r1, r2) => r2.score - r1.score).forEach(r => {
  console.log(`${r.player.name}: ${r.score}`);
})