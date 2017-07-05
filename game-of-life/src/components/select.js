import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {isEqualNoFunction} from '../helper/compare';

class Select extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqualNoFunction(nextProps, this.props);
  }

  render() {
    const {options, ...otherProps} = this.props;
    return (
      <select {...otherProps}>
        {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
      </select>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default Select;
