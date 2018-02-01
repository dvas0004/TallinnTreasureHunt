import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './configureStore';

import App from './App';

const ReduxApp = () => (
  <Provider store={store}>
      <App />
    </Provider>
  )


AppRegistry.registerComponent('TallinnTreasureHunt', () => ReduxApp);
