# react-native-back-android
A Higher-order Component for handling back button press on React Native Android

```
npm install --save react-native-back-android
```

# Usage (Take Navigator as an example. Can be used in any scenario.)
Root component
```
...
import backAndroid from 'react-native-back-android';

class Example extends Component {
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return (
              <EnhancedScene1
                navigator={navigator}
              />
            );
          } else {
            return (
              <EnhancedScene2
                navigator={navigator}
              />
            );
          }
        }}
        style={{padding: 100}}
      />
    );
  }
}

const EnhancedExample = backAndroid(Example);

export default EnhancedExample;
```

Any component that wants to handle backButtonPress
```
...
import { hardwareBackPress, exitApp } from 'react-native-back-android';

class Scene1 extends Component {
  handleHardwareBackPress() {
    console.log('* Scene1 back press');
    exitApp();
    return true;
  }
  render() {
    return (
      <View>
        <Text>Scene1</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.navigator.push(routes[1]);
          }}
        >
          <Text>Go To Scene2</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const EnhancedScene1 = hardwareBackPress(Scene1);

export default EnhanceScene1;
```

Stateless component
```
...
import { hardwareBackPress } from 'react-native-back-android';

const Scene2 = ({ navigator }) => (
  <View>
    <Text>Scene2</Text>
    <TouchableHighlight
      onPress={() => {
        navigator.pop();
      }}
    >
      <Text>Go Back To Scene2</Text>
    </TouchableHighlight>
  </View>
);
const handleBackButtonPress = ({ navigator }) => {
  navigator.pop();
  return true;
};
const EnhancedScene2 = hardwareBackPress(Scene2, handleBackButtonPress);

export default EnhancedScene2;
```
