import React, {Component} from 'react';
// import './App.css';

import GameOfLife from './game/game-of-life';

import SeedContent from './components/seed-content/index';
import GameContent from './components/game-content/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.game = null;

    this.state = {
      currentGameState: null,
      currentGameIteration: -1,
      currentGameIterationDead: -1,
      deathTickResult: null,

      isCreatingSeed: true,
      seedModeOptionId: 'board',
      boardConfigOptionId: 'custom',
      onCancelSeedModeOptionId: 'board',
      onCancelBoardConfigOptionId: 'custom',

      isSimulating: false,
    };
  }

  onChangeSeed = () => {
    const {seedModeOptionId, boardConfigOptionId} = this.state;
    this.setState({
      isCreatingSeed: true,
      onCancelSeedModeOptionId: seedModeOptionId,
      onCancelBoardConfigOptionId: boardConfigOptionId,
    });
  };

  onCancelChangeSeed = () => {
    const {onCancelSeedModeOptionId, onCancelBoardConfigOptionId} = this.state;
    this.setState({
      isCreatingSeed: false,
      seedModeOptionId: onCancelSeedModeOptionId,
      boardConfigOptionId: onCancelBoardConfigOptionId,
    });
  };

  onSetSeed = (newSeed) => {
    this.game = new GameOfLife(newSeed);
    this.setState({
      deathTickResult: null,
      currentGameState: this.game.getCurrentState,
      currentGameIteration: this.game.getIteration,
      currentGameIterationDead: this.game.getIterationDead,
      isCreatingSeed: false,
    });
  };


  onSeedModeChange = (evt) => {
    this.setState({
      seedModeOptionId: evt.target.value,
    });
  };

  onBoardConfigChange = (evt) => {
    this.setState({
      boardConfigOptionId: evt.target.value,
    });
  };

  onTick = () => {
    this.game.tick();
    this.setState({
      ...this.getDefaultNewGameState(),
    });
  };

  onSimulateStart = () => {
    this.game.simulateTicks({
      callback: (deathTickState) => {
        if (deathTickState === GameOfLife.deathTicks.ALL_DEAD) {
          this.setState({
            ...this.getDefaultNewGameState(),
            isSimulating: false,
          });
        } else if (deathTickState === GameOfLife.deathTicks.UNRESOLVED) {
          this.setState({
            ...this.getDefaultNewGameState(),
            isSimulating: false,
          });
        } else {
          // Just normal on tick
          this.setState({
            ...this.getDefaultNewGameState(),
          });
        }
      },
    });
    this.setState({
      isSimulating: true,
    });
  };

  onSimulateStop = () => {
    this.game.cancelSimulateTick();
    this.setState({
      ...this.getDefaultNewGameState(),
      isSimulating: false,
    });
  };

  onDeathTick = () => {
    let deathTickResult = this.game.deathTicks();
    if (deathTickResult === GameOfLife.deathTicks.ALL_DEAD) {
      deathTickResult = 'Death ticks have killed all cells!';
    } else if (deathTickResult === GameOfLife.deathTicks.UNRESOLVED) {
      deathTickResult = 'After many iterations, not all cells are dead';
    }
    this.setState({
      deathTickResult,
      ...this.getDefaultNewGameState(),
    });
  };

  getDefaultNewGameState() {
    if (!this.game) {
      return {};
    }
    return {
      currentGameState: this.game.getCurrentState,
      currentGameIteration: this.game.getIteration,
      currentGameIterationDead: this.game.getIterationDead,
    };
  }

  render() {
    const {
      currentGameState,
      currentGameIteration,
      currentGameIterationDead,
      isSimulating,
      deathTickResult,
      isCreatingSeed,
      seedModeOptionId,
      boardConfigOptionId,
    } = this.state;
    return (
      <div>
        <h4 style={{textAlign: 'center'}}>Game of Life</h4>
        {isCreatingSeed &&
          <SeedContent
            hasGame={Boolean(this.game)}
            board={this.game && this.game.getSeed}
            seedModeOptionId={seedModeOptionId}
            boardConfigOptionId={boardConfigOptionId}
            onCancelChangeSeed={this.onCancelChangeSeed}
            onSetSeed={this.onSetSeed}
            onSeedModeChange={this.onSeedModeChange}
            onBoardConfigChange={this.onBoardConfigChange}
          />
        }
        {!isCreatingSeed &&
          <GameContent
            currentGameState={currentGameState}
            currentGameIteration={currentGameIteration}
            currentGameIterationDead={currentGameIterationDead}
            deathTickResult={deathTickResult}
            isSimulating={isSimulating}
            onTick={this.onTick}
            onDeathTick={this.onDeathTick}
            onSimulateStart={this.onSimulateStart}
            onSimulateStop={this.onSimulateStop}
            onChangeSeed={this.onChangeSeed}
          />
        }
      </div>
    );
  }
}

export default App;
