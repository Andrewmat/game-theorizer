const Evolution = require('../model/Evolution');
const {
  ReasonableGuy,
  MeanGuy,
  GoodGuy,
  SpitefulGuy,
  Cientist
} = require('../service/DefaultPlayers');

new Evolution()
  .players([
      { player: ReasonableGuy, qtd: 7 },
      { player: MeanGuy, qtd: 7 },
      { player: SpitefulGuy, qtd: 7 }
  ])
  .threshold(0.8)
  .observe((state, i) => console.log(` ---  ${i}  --- `))
  .observe((state, i) => console.log(state.players))
  .start((state, i) => i < 10);