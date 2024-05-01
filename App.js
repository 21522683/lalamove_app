import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import TotalStack from './src/navigations/TotalStack';

export default function App() {
  
  return (
    <Provider store={store}>
      <TotalStack />
    </Provider>
  );
}
