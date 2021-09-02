/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './Main';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
