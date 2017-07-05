/* global it, expect */
import isEqual from 'lodash.isequal';

import GameOfLife from '../../game/game-of-life';

function testGame(seed, numOfIterations, expectedState) {
  const game = new GameOfLife(seed);
  for (let i = 0; i < numOfIterations; i++) {
    game.tick();
  }
  return isEqual(game.getCurrentState, expectedState);
}

function testGameSequence(seed, numOfIterations, expectedStates) {
  const game = new GameOfLife(seed);
  const testResults = [];
  for (let i = 0; i < numOfIterations; i++) {
    game.tick();
    testResults.push(isEqual(game.getCurrentState, expectedStates[i]));
  }

  // Return true only if everything is true
  return testResults.reduce((final, res) => {
    if (res === false) {
      final = false;
    }
    return final;
  }, true);
}

it('does basic check for game class', () => {
  expect(() => new GameOfLife()).toThrowError('`seed` param is not array');
  expect(() => new GameOfLife({})).toThrowError('`seed` param is not array');
  expect(() => new GameOfLife([])).toThrowError('We need at least 1 cell block to start the game, buddy ;)');
  expect(() => new GameOfLife([[0, 1], [0]])).toThrowError('Each row needs to have the same length. Row index 1 has length 1. Expected 2');
  expect(() => new GameOfLife([[], []])).toThrowError('Cannot start game due to `maxX` or `maxY` index is below 0');
});

it('ticks correctly with `testGame`', () => {
  const seed = [
    [0, 1, 0],
    [0, 1, 1],
  ];

  expect(testGame(
    seed,
    1,
    [
      [1, 1, 1],
      [1, 1, 1],
    ]
  )).toEqual(true);

  expect(testGame(
    seed,
    2,
    [
      [0, 0, 0],
      [0, 0, 0],
    ]
  )).toEqual(true);

  expect(testGame(
    seed,
    3,
    [
      [0, 0, 0],
      [0, 0, 0],
    ]
  )).toEqual(true);

  expect(testGame(
    [[0, 1, 0]],
    1,
    [[0, 0, 0]]
  )).toEqual(true);
});

it('ticks correctly with testGameSequence', () => {
  const seed = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ];

  expect(testGameSequence(
    seed,
    6,
    [
      [
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
      ],
      [
        [1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
      ],
      [
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    ]
  )).toEqual(true);
});
