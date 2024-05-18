/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.config';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
