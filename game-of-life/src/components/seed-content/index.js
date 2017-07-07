import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GameBoard from '../game-board';
import Select from '../select';

import GameOfLife from '../../game/game-of-life';
import {presetBoards} from '../../constants/board';

import {Flex} from '../shared-components';

const presetBoardOptions = [
  {value: 'custom', label: 'CUSTOM'},
  ...(Object.keys(presetBoards).map((key) => ({value: key, label: presetBoards[key].label || key}))),
];

class SeedContent extends Component {
  constructor(props) {
    super(props);
    const board = props.board || new Array(30).fill(new Array(30).fill(GameOfLife.cellStates.DEAD));
    this.state = {
      rowCount: board.length,
      colCount: board[0].length,
      board,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {boardConfigOptionId: nextBoardConfigId} = nextProps;
    const {boardConfigOptionId: currentBoardConfigId} = this.props;
    if (nextBoardConfigId !== 'custom' && nextBoardConfigId !== currentBoardConfigId) {
      const presetBoardConfig = presetBoards[nextBoardConfigId];
      const board = presetBoardConfig.board;
      this.setState({
        rowCount: board.length,
        colCount: board[0].length,
        board,
      });
    }
  }

  onCellClick = ({rowIdx, colIdx, cellState}) => {
    const newBoard = this.state.board.slice().map((e) => e.slice());
    newBoard[rowIdx][colIdx] = cellState;
    this.props.onBoardConfigChange({
      target: {
        value: 'custom',
      },
    });
    this.setState({
      board: newBoard,
    });
  };

  onRowCountChange = (evt) => {
    const row = parseInt(evt.target.value, 10);
    const newState = {rowCount: !isNaN(row) ? row : evt.target.value};
    if (row > 0) {
      newState.board = new Array(row).fill(new Array(this.state.colCount).fill(GameOfLife.cellStates.DEAD));
    }
    this.setState(newState);
  };

  onColCountChange = (evt) => {
    const col = parseInt(evt.target.value, 10);
    const newState = {colCount: !isNaN(col) ? col : evt.target.value};
    if (col > 0) {
      newState.board = new Array(this.state.rowCount).fill(new Array(col).fill(GameOfLife.cellStates.DEAD));
    }
    this.setState(newState);
  };

  render() {
    const {
      rowCount,
      colCount,
      board,
    } = this.state;

    const {
      hasGame,
      seedModeOptionId,
      boardConfigOptionId,
      onSetSeed,
      onSeedModeChange,
      onBoardConfigChange,
      onCancelChangeSeed,
    } = this.props;
    return (
      <div>
        <Flex>
          <div>
            <div style={{fontSize: '12px', fontWeight: 500}}>Seed Mode</div>
            <Select
              options={[{value: 'board', label: 'Board'}]}
              onChange={onSeedModeChange}
              value={seedModeOptionId}
            />
            <div>
              <span style={{fontSize: '10px'}}>Row x Col</span>
              <div>
                <input style={{width: '40px'}} type="number" placeholder="row" value={rowCount} onChange={this.onRowCountChange} />
                <input style={{width: '40px'}} type="number" placeholder="col" value={colCount} onChange={this.onColCountChange} />
              </div>
            </div>
          </div>
          <div style={{marginLeft: '24px'}}>
            <div style={{fontSize: '12px', fontWeight: 500}}>Preset Board Configuration</div>
            <Select
              options={presetBoardOptions}
              onChange={onBoardConfigChange}
              value={boardConfigOptionId}
            />
          </div>
          <div style={{marginLeft: '24px'}}>
            {hasGame && <button onClick={onCancelChangeSeed}>Cancel / Go Back</button>}
            <button onClick={() => onSetSeed(board)}>Set Seed</button>
          </div>
        </Flex>
        <Flex style={{marginTop: '24px'}}>
          <GameBoard
            board={board}
            onCellClick={this.onCellClick}
          />
        </Flex>
      </div>
    );
  }
}

SeedContent.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  hasGame: PropTypes.bool.isRequired,
  seedModeOptionId: PropTypes.string.isRequired,
  boardConfigOptionId: PropTypes.string.isRequired,
  onSetSeed: PropTypes.func.isRequired,
  onSeedModeChange: PropTypes.func.isRequired,
  onBoardConfigChange: PropTypes.func.isRequired,
  onCancelChangeSeed: PropTypes.func.isRequired,
};

export default SeedContent;
