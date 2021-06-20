import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from "react-redux";
import store from "@bookstore/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import MainNavigator from '@bookstore/router/main-navigator';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

let persistor = persistStore(store);


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={() => <ActivityIndicator />} persistor={persistor}>
        <MainNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <StatusBar hidden />
      </PersistGate>
    </Provider>
  );
}