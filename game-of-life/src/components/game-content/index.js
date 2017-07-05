import React from 'react';
import PropTypes from 'prop-types';

import GameBoard from '../game-board';

const GameContent = (props) => {
  const {
    currentGameState,
    currentGameIteration,
    currentGameIterationDead,
    deathTickResult,
    isSimulating,
    onTick,
    onDeathTick,
    onSimulateStart,
    onSimulateStop,
    onChangeSeed,
  } = props;
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {!isSimulating && <button onClick={onChangeSeed}>Change Seed</button>}
        {isSimulating && <button onClick={onSimulateStop}>Stop Simulation</button>}
        {!isSimulating &&
          <div>
            <button style={{marginLeft: '12px'}} onClick={onTick}>Tick</button>
            <button style={{marginLeft: '4px'}} onClick={onSimulateStart}>Simulate</button>
            <button style={{marginLeft: '12px'}} onClick={onDeathTick}>Death Tick!</button>
          </div>
        }
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{marginTop: '4px', marginBottom: '4px', height: '60px', textAlign: 'center'}}>
          {/* The height style is to keep the element from jumping around. Adjust as you add more elements into this div */}
          <div>
            Iteration: {currentGameIteration}
          </div>
          {currentGameIterationDead > -1 && <div>All cells dead after {currentGameIterationDead} iteration{currentGameIterationDead > 1 ? 's' : ''}</div>}
          {deathTickResult && <div>{deathTickResult}</div>}
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <GameBoard board={currentGameState} />
      </div>
    </div>
  );
};

GameContent.propTypes = {
  currentGameState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  currentGameIteration: PropTypes.number,
  currentGameIterationDead: PropTypes.number,
  deathTickResult: PropTypes.string,
  isSimulating: PropTypes.bool,
  onTick: PropTypes.func.isRequired,
  onDeathTick: PropTypes.func.isRequired,
  onSimulateStart: PropTypes.func.isRequired,
  onSimulateStop: PropTypes.func.isRequired,
  onChangeSeed: PropTypes.func.isRequired,
};

export default GameContent;
