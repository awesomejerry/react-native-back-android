import { Platform } from 'react-native';

export default function isAndroid() {
  return Platform.OS === 'android';
}
