const Match = require('./src/Match');
const {
  GoodGuy,
  MeanGuy,
  ReasonableGuy,
  CautiousGuy,
  Monkey
} = require('./src/Player');

var playerA = new MeanGuy('mean');
var playerB = new ReasonableGuy('reasonable');

var match = new Match(10,
  [playerA, playerB], {
    win: 5,
    lose: 0,
    half: 3,
    neutral: 3
  }
).playMatch();

console.log(`${playerA.name} scored ${match.score(playerA)}.`);
console.log(`${playerB.name} scored ${match.score(playerB)}`);
match.history