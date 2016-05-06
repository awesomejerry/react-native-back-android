// core
import React, { PropTypes, Component } from 'react';
import { BackAndroid } from 'react-native';
// utils
import isAndroid from './utils/isAndroid.js';

const handler = {
  _callbacks: [],
  onHardwareBackPress(callback) {
    this._callbacks.unshift(callback);
  },
  offHardwareBackPress(callback) {
    const index = this._callbacks.indexOf(callback);
    if (index !== -1) {
      this._callbacks.splice(index, -1);
    }
  },
};
export default function backAndroid(MyComponent) {
  if (isAndroid()) {
    class EnhancedComponent extends Component {
      static propTypes = {
        goBack: PropTypes.func,
      };
      static childContextTypes = {
        backAndroid: PropTypes.object,
      };
      getChildContext() {
        return {
          backAndroid: handler,
        };
      }
      componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButtonPress);
      }
      componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
      }
      handleBackButtonPress = () => {
        // should back button press go back navigator
        let preventDefault = false;

        for (const i in handler._callbacks) {
          if (handler._callbacks.hasOwnProperty(i)) {
            const callback = handler._callbacks[i];
            const result = callback.call();
            // if any callbacks return true, prevent default
            if (result) {
              preventDefault = true;
              break;
            }
          }
        }

        if (!preventDefault) {
          if (this.props.goBack) {
            this.props.goBack();
          }
        }
        return true;
      };
      render() {
        return (
          <MyComponent
            {...this.props}
          />
        );
      }
    }
    return EnhancedComponent;
  }
  return MyComponent;
}
