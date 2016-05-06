// core
import React, { PropTypes, Component } from 'react';
import { BackAndroid } from 'react-native';
// utils
import isAndroid from '../utils/isAndroid.js';

export default function hardwareBackPress(MyComponent) {
  if (isAndroid()) {
    class EnhancedComponent extends Component {
      static contextTypes = {
        backAndroid: PropTypes.object,
      };
      componentDidMount() {
        const { backAndroid } = this.context;
        const { handleHardwareBackPress } = this.refs.child;
        if (handleHardwareBackPress) {
          backAndroid.onHardwareBackPress(handleHardwareBackPress);
        }
      }
      componentWillUnmount() {
        const { backAndroid } = this.context;
        const { handleHardwareBackPress } = this.refs.child;
        if (handleHardwareBackPress) {
          backAndroid.offHardwareBackPress(handleHardwareBackPress);
        }
      }
      render() {
        return (
          <MyComponent
            ref="child"
            {...this.props}
          />
        );
      }
    }
    return EnhancedComponent;
  }
  return MyComponent;
}
