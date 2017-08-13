const Match = require('./src/model/Match');
const {
  GoodGuy,
  MeanGuy,
  ReasonableGuy,
  CautiousGuy,
  Monkey
} = require('./src/model/Player');

var playerA = new CautiousGuy('caut');
var playerB = new ReasonableGuy('reas');

var match = new Match(10,
  [playerA, playerB], {
    win: 5,
    lose: 0,
    half: 3,
    neutral: 2
  }
).playMatch();
