// core
import React, { PropTypes, Component } from 'react';
import { BackAndroid } from 'react-native';
// utils
import isAndroid from '../utils/isAndroid.js';

export default function hardwareBackPress(MyComponent) {
  if (isAndroid()) {
    return class EnhancedComponent extends MyComponent {
      static contextTypes = {
        backAndroid: PropTypes.object,
        ...MyComponent.contextTypes,
      };
      componentDidMount() {
        const { backAndroid } = this.context;
        if (this.handleHardwareBackPress) {
          backAndroid.onHardwareBackPress(this.handleHardwareBackPress);
        }
        if (super.componentDidMount) {
          super.componentDidMount();
        }
      }
      componentWillUnmount() {
        const { backAndroid } = this.context;
        if (this.handleHardwareBackPress) {
          backAndroid.offHardwareBackPress(this.handleHardwareBackPress);
        }
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
      }
      render() {
        return super.render();
      }
    }
  }
  return MyComponent;
}
