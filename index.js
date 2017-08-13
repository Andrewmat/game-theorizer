const Match = require('./src/model/Match');
const dftPlayer = require('./src/service/DefaultPlayers');

var players = [
  new dftPlayer.Monkey('prego'),
  new dftPlayer.Monkey('dourado')
];

var match = new Match(10,
  players, {
    win: 5,
    lose: 0,
    half: 3,
    neutral: 3
  }
).playMatch();

var results = match.score();
players.forEach((p, i) => {
  console.log(`${p.name}: ${results[i]}`);
})