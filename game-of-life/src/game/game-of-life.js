/* eslint-disable no-use-before-define */
import dotty from 'dotty';

/*
Rules are like follows:
Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by over-population.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

(x, y) with 0 index and starts from top left

In this class, we are constructing the board with array of array of objects.
The input (seed) is actually array of array of numbers, though.
We are doing this so that it is easier for us to somehow add more metadata into our cells IF needed later.
*/
export default class GameOfLife {
  /**
   *
   * @param {Array.<number[]>} seed -- 2 dimensional array containing states
   */
  constructor(seed) {
    // Simple type checking
    if (!seed || !Array.isArray(seed)) {
      throw new Error('`seed` param is not array');
    }
    if (seed.length === 0) {
      throw new Error('We need at least 1 cell block to start the game, buddy ;)');
    }

    // Make sure each row has the same length
    const lengthToCheck = seed[0].length;
    seed.forEach((rows, idx) => {
      if (rows.length !== lengthToCheck) {
        throw new Error(`Each row needs to have the same length. Row index ${idx} has length ${rows.length}. Expected ${lengthToCheck}`);
      }
    });

    this.seed = seed.slice();

    this.maxX = this.seed.length - 1;
    this.maxY = this.seed[0].length - 1;
    if (this.maxX < 0 || this.maxY < 0) {
      throw new Error('Cannot start game due to `maxX` or `maxY` index is below 0');
    }

    // Current board state
    this.currentState = constructBoard(this.seed);
    this.iteration = 0;

    // The iteration count when all cells are dead
    this.iterationDead = -1;

    this.simulationInterval = null;
  }

  get getSeed() {
    return this.seed;
  }

  get getCurrentState() {
    return deconstructBoard(this.currentState);
  }

  get getIteration() {
    return this.iteration;
  }

  get getIterationDead() {
    return this.iterationDead;
  }

  /**
   *
   * @param {object} cell
   * @param {number} cell.state
   * @param {object} pos
   * @param {number} pos.x
   * @param {number} pos.y
   */
  getNextStateCellObj(cell, pos) {
    /*
    Check surrounding it (diagonal as well)

    Say position is (1, 1).
    We need to check:
    (0, 0)  (x-1, y-1)
    (0, 1)  (x-1, y)
    (0, 2)  (x-1, y+1)
    (1, 0)  (x, y-1)
    (1, 1)  (x, y) --- SKIP
    (1, 2)  (x, y+1)
    (2, 0)  (x+1, y-1)
    (2, 1)  (x+1, y)
    (2, 2)  (x+1, y+1)
     */
    const {state} = cell;

    const surroundingCells = getSurroundingCells(pos, this.currentState, this.maxX, this.maxY);

    // Now, filter out only unique live cell positions, and get the count. Then, look up the rules.
    const surroundingLiveCellsCount = surroundingCells.liveCells.reduce((final, cellPos) => {
      const hasPosition = Boolean(final.find((f) => f[0] === cellPos[0] && f[1] === cellPos[1]));
      if (!hasPosition) {
        final.push(cellPos);
      }
      return final;
    }, []).length;

    return {
      ...cell,
      state: getNextCellState(state, surroundingLiveCellsCount),
    };
  }

  tick() {
    // Just loop through this 2 dimensional arrays
    let totalLiveCellsCount = 0;
    const nextState = this.currentState.map((rowCells, x) => rowCells.map((colCell, y) => {
      const nextStateCellObj = this.getNextStateCellObj(colCell, {x, y});
      if (nextStateCellObj.state === GameOfLife.cellStates.LIVE) {
        totalLiveCellsCount += 1;
      }
      return nextStateCellObj;
    }));

    // Set the next state
    this.currentState = nextState;
    this.iteration += 1;

    if (this.iterationDead === -1 && totalLiveCellsCount === 0) {
      this.iterationDead = this.iteration;
    }
  }

  simulateTicks(options = {}) {
    const {
      intervalTime = 500,
      callback = () => {},
    } = options;

    let iteration = 0;
    const iterate = () => {
      if (this.iterationDead > -1) {
        clearInterval(this.simulationInterval);
        this.simulationInterval = null;
        callback(GameOfLife.deathTicks.ALL_DEAD);
        return;
      }
      this.tick();
      iteration += 1;
      if (iteration >= GameOfLife.maxIteration) {
        clearInterval(this.simulationInterval);
        this.simulationInterval = null;
        callback(GameOfLife.deathTicks.UNRESOLVED);
      } else {
        callback();
      }
    };
    this.simulationInterval = setInterval(() => iterate(), intervalTime);
  }

  cancelSimulateTick() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  // Method naming skill is definitely at par with Principal Engineer
  deathTicks() {
    // TODO figure out whether we need "equilibrium" state??
    for (let i = 0; i < GameOfLife.maxIteration; i++) {
      if (this.iterationDead > -1) {
        return GameOfLife.deathTicks.ALL_DEAD;
      }
      this.tick();
    }

    return GameOfLife.deathTicks.UNRESOLVED;
  }

  reset() {
    this.currentState = constructBoard(this.seed);
    this.iteration = 0;
    this.iterationDead = -1;
  }
}

GameOfLife.maxIteration = 2000;
GameOfLife.cellStates = {
  DEAD: 0,
  LIVE: 1,
};
GameOfLife.deathTicks = {
  UNRESOLVED: -1,
  ALL_DEAD: 1,
};

function constructBoard(seed) {
  return seed.map((rowCells) => rowCells.map((cellState) => {
    if (typeof cellState === 'number') {
      return {state: cellState};
    }
    return cellState;
  }));
}

function deconstructBoard(board) {
  return board.map((rows) => rows.map((cell) => cell.state));
}

/**
 *
 * @param {number} currentState
 * @param {number} liveCellCount
 * @returns {number}
 */
function getNextCellState(currentState, liveCellCount) {
  // Dead by default
  let nextState = GameOfLife.cellStates.DEAD;
  if (currentState === GameOfLife.cellStates.LIVE) {
    if (liveCellCount < 2) {
      // Under population :(
      nextState = GameOfLife.cellStates.DEAD;
    } else if (liveCellCount === 2 || liveCellCount === 3) {
      // Lives on, perfect population :)
      nextState = GameOfLife.cellStates.LIVE;
    } else if (liveCellCount > 3) {
      // Over population :(
      nextState = GameOfLife.cellStates.DEAD;
    }
  } else if (currentState === GameOfLife.cellStates.DEAD) {
    if (liveCellCount === 3) {
      // Reproduction! Reincarnation! Ressurection!
      nextState = GameOfLife.cellStates.LIVE;
    }
  }
  return nextState;
}

/* eslint-disable no-continue */
function getSurroundingCells(pos, currentBoardState, maxX, maxY) {
  const {x: posX, y: posY} = pos;
  const liveCells = [];
  for (let x = posX - 1; x <= posX + 1; x++) {
    for (let y = posY - 1; y <= posY + 1; y++) {
      if (x === posX && y === posY) {
        // Skip if it's current position of the current cell
        continue;
      }

      let currentX = x;
      let currentY = y;

      if (currentX < 0) {
        currentX = maxX;
      } else if (currentX > maxX) {
        currentX = 0;
      }

      if (currentY < 0) {
        currentY = maxY;
      } else if (currentY > maxY) {
        currentY = 0;
      }

      const cell = dotty.get(currentBoardState, [currentX, currentY]);
      if (!cell) {
        // Well, cell doesn't exist, continue
        continue;
      }

      if (cell.state === GameOfLife.cellStates.LIVE) {
        liveCells.push([currentX, currentY]);
      }
    }
  }

  return {
    liveCells,
  };
}
/* eslint-enable no-continue */
