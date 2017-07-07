import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {styled} from 'styletron-react';

import {colors} from '../../helper/style';
import {isEqualNoFunction} from '../../helper/compare';

const baseDotStyle = {
  width: '2px',
  height: '2px',
  border: `1px solid ${colors.grey400}`,
  backgroundColor: colors.grey400,
  borderRadius: '50%',
  display: 'inline-block',
  marginBottom: '3px',
  opacity: 0.7,
  transition: 'background-color 200ms, width 100ms',
};

const liveDotStyle = {
  width: '10px',
  height: '10px',
  border: `1px solid ${colors.green400}`,
  backgroundColor: colors.green400,
  marginBottom: 0,
  opacity: 1,
};

const Container = styled('div', () => ({
  width: '16px',
  height: '16px',
  display: 'inline-block',
  textAlign: 'center',
}));

const Dot = styled('div', ({isLive}) => ({
  ...baseDotStyle,
  ...(isLive ? liveDotStyle : {}),
}));

class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqualNoFunction(nextProps, this.props);
  }

  render() {
    const {isLive, ...otherProps} = this.props;
    return (
      <Container {...otherProps}>
        <Dot isLive={isLive} />
      </Container>
    );
  }
}

Cell.propTypes = {
  isLive: PropTypes.bool,
  style: PropTypes.shape(),
};

export default Cell;
