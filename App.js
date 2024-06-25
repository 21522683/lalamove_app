import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import TotalStack from './src/navigations/TotalStack';
import {LocationProvider} from './TrackLocation';

export default function App() {
  return (
    <Provider store={store}>
      <LocationProvider>
        <TotalStack />
      </LocationProvider>
    </Provider>
  );
}
