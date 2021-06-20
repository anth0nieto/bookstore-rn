import {
  configureStore,
  getDefaultMiddleware,
  isPlain,
} from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["books"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      isSerializable: (value: any) => isPlain(value),
    },
  }),
});
