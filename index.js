'use strict';
const Player = require('./src/model/Player');
const SingleMatch = require('./src/model/SingleMatch');
const CompositeMatch = require('./src/model/CompositeMatch');
const defaultPlayer = require('./src/service/defaultPlayer');

module.exports = {
  Player,
  SingleMatch,
  CompositeMatch,
  defaultPlayer
}