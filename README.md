[![NPM](https://nodei.co/npm/react-native-back-android.png)](https://npmjs.org/package/react-native-back-android)

# react-native-back-android
A Higher-order Component for handling back button press on React Native Android

```
npm install --save react-native-back-android
```

# Usage
(Take Navigator as an example. Can be used in any scenario.)  

```
import React, { Component } from 'react'
import { AppRegistry, Button, Text, View, Alert } from 'react-native'
import { StackNavigator } from 'react-navigation'
import backAndroid, {
  hardwareBackPress,
  exitApp
} from 'react-native-back-android'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  }
  // reserved function for handling hardware back press
  handleHardwareBackPress = () => {
    Alert.alert(
      'Quiting',
      'Want to quit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => exitApp() }
      ],
      { cancelable: false }
    );
    // return true to stop bubbling
    return true
  };
  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button onPress={() => navigate('Chat')} title='Chat with Lucy' />
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy'
  }
  // reserved function for handling hardware back press
  handleHardwareBackPress = () => {
    const { goBack } = this.props.navigation
    Alert.alert(
      'Going Back',
      'Want to go back?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => goBack() }
      ],
      { cancelable: false }
    );
    // return true to stop bubbling
    return true
  };
  render () {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    )
  }
}

const ReactNativeBackAndroidExample = StackNavigator({
  Home: { screen: hardwareBackPress(HomeScreen) },
  Chat: { screen: hardwareBackPress(ChatScreen) }
})

AppRegistry.registerComponent('ReactNativeBackAndroidExample', () =>
  backAndroid(ReactNativeBackAndroidExample)
)
```
Stateless component
```
...
import { hardwareBackPress } from 'react-native-back-android';

const Stateless = ({ navigator }) => (
  <View>
    <Text>Stateless</Text>
    <Button
      title="stateless"
      onPress={() => {
        navigator.pop();
      }}
    />
  </View>
);
const handleBackButtonPress = ({ navigation }) => {
  navigation.goBack();
  return true;
};
const EnhancedStateless = hardwareBackPress(Stateless, handleBackButtonPress);

export default EnhancedStateless;
```
