import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import rootReducer from "../../root-reducer";

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
