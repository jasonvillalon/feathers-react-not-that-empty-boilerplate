/**
 *  Point of contact for component modules
 *
 *  ie: import { CounterButton, InfoBar } from 'components';
 *
 */
import React, { PropTypes } from 'react';

export Provider from './Provider';

const AppWrapper = props => (
  <div>
    {props.children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.node,
};

AppWrapper.defaultProps = {
  children: null,
};

export default AppWrapper;
