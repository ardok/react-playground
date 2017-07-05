import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {styled} from 'styletron-react';

import {colors} from '../../helper/style';
import {isEqualNoFunction} from '../../helper/compare';

// const Container = styled('div', () => ({
//   width: '16px',
//   height: '16px',
//   display: 'inline-block',
//   textAlign: 'center',
// }));

const containerStyle = {
  width: '16px',
  height: '16px',
  display: 'inline-block',
  textAlign: 'center',
};

const baseDotStyle = {
  width: '2px',
  height: '2px',
  border: `1px solid ${colors.grey400}`,
  backgroundColor: colors.grey400,
  borderRadius: '50%',
  display: 'inline-block',
  marginBottom: '3px',
  opacity: 0.7,
  // transition: 'opacity 200ms, background-color 200ms, border 200ms',
};

const liveDotStyle = {
  width: '10px',
  height: '10px',
  border: `1px solid ${colors.green400}`,
  backgroundColor: colors.green400,
  marginBottom: 0,
  opacity: 1,
};

class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqualNoFunction(nextProps, this.props);
  }

  render() {
    const {isLive, style, ...otherProps} = this.props;
    const finalStyle = {
      ...containerStyle,
      ...style,
    };
    return (
      <div style={finalStyle} {...otherProps}>
        <div
          style={{
            ...baseDotStyle,
            ...(isLive ? liveDotStyle : {}),
          }}
        />
      </div>
    );
    // return (
    //   <Container {...otherProps}>
    //     <div
    //       style={{
    //         ...baseDotStyle,
    //         ...(isLive ? liveDotStyle : {}),
    //       }}
    //     />
    //   </Container>
    // );
  }
}

Cell.propTypes = {
  isLive: PropTypes.bool,
  style: PropTypes.shape(),
};

export default Cell;
