// core
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BackHandler } from 'react-native'
// utils
import isAndroid from './utils/isAndroid.js'

const handler = {
  _callbacks: [],
  onHardwareBackPress (callback) {
    this._callbacks.unshift(callback)
  },
  offHardwareBackPress (callback) {
    const index = this._callbacks.indexOf(callback)
    if (index !== -1) {
      this._callbacks.splice(index, 1)
    }
  }
}
export default function backAndroid (MyComponent, shouldExit = false) {
  if (isAndroid()) {
    class EnhancedComponent extends Component {
      static propTypes = {
        goBack: PropTypes.func
      };
      static childContextTypes = {
        backAndroid: PropTypes.object
      };
      getChildContext () {
        return {
          backAndroid: handler
        }
      }
      componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress)
      }
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress)
      }
      handleBackButtonPress = () => {
        // has already been captured by some component
        let beenCaptured = false

        for (const i in handler._callbacks) {
          if (handler._callbacks.hasOwnProperty(i)) {
            const callback = handler._callbacks[i]
            const result = callback.call()
            // if any callbacks return true, it means that back press event is captured
            if (result) {
              beenCaptured = true
              break
            }
          }
        }

        // return true to prevent exiting app
        if (beenCaptured) {
          return true
        }

        return shouldExit
      };
      render () {
        return (
          <MyComponent
            {...this.props}
          />
        )
      }
    }
    return EnhancedComponent
  }
  return MyComponent
}
