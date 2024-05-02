import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import TotalStack from './src/navigations/TotalStack';
import DriverTabStack from './src/navigations/DriverTabStack';
import {NavigationContainer} from '@react-navigation/native';
import UserTabStack from './src/navigations/UserTabStack';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DriverTabStack />
      </NavigationContainer>
    </Provider>
  );
}
