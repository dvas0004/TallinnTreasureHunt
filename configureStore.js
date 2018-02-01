import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, autoMergeLevel2 } from 'redux-persist';
import app from './reducers';
import { AsyncStorage } from "react-native";
import logger from 'redux-logger';

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const persistReducerInst = persistReducer(persistConfig, app);

export const store = createStore(persistReducerInst, applyMiddleware(
  logger
));
export const persistor = persistStore(store);
