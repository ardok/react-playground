import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Cell from './cell/index';

import GameOfLife from '../game/game-of-life';
import {isEqualNoFunction} from '../helper/compare';

class SeedBoard extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqualNoFunction(nextProps, this.props);
  }

  render() {
    const {
      board,
      onCellClick,
    } = this.props;

    const wrapperCellClick = (rowIdx, colIdx) => {
      let nextCellState;
      if (board[rowIdx][colIdx] === GameOfLife.cellStates.DEAD) {
        nextCellState = GameOfLife.cellStates.LIVE;
      } else {
        nextCellState = GameOfLife.cellStates.DEAD;
      }
      onCellClick({
        rowIdx,
        colIdx,
        cellState: nextCellState,
      });
    };

    return (
      <div>
        {board.map((rows, rowIdx) => (
          <div key={rowIdx}>
            {rows.map((cell, colIdx) => {
              const cellProps = {
                key: colIdx,
                isLive: cell === GameOfLife.cellStates.LIVE,
              };
              if (onCellClick) {
                cellProps.onClick = () => wrapperCellClick(rowIdx, colIdx);
              }
              return <Cell {...cellProps} />;
            })}
          </div>
          ))}
      </div>
    );
  }
}

SeedBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onCellClick: PropTypes.func,
};

export default SeedBoard;
