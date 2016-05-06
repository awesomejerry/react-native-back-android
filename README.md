# react-native-back-android
A Higher-order Component for handling back button press on React Native Android

```
npm install --save react-native-back-android
```

# Usage
Root component
```
...
import backAndroid from 'react-native-back-android';

class App extends React.Component {
  ...
}

export default backAndroid(App);
```

Any component that wants to handle backButtonPress
```
...
import { hardwareBackPress } from 'react-native-back-android';

class MyStatus extends React.Component {
  ...
  /* make sure to define a function called "handleHardwareBackPress" */
  handleHardwareBackPress() {
    if (this.state.isOpen()) {
      this.handleClose();
      /* don't forget to return true after handling back button press */
      return true;
    }
  }
  ...
}

export default hardwareBackPress(MyStatus);
```
