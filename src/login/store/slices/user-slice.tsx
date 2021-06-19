import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@bookstore/common/store";
import { User } from "@bookstore/login/model";
import * as api from "@bookstore/login/rest/api";
import { showToast } from "@bookstore/common/utils";

const initialStateUser = {
  sessionTokenBck: null,
  email: "",
  firstname: "",
  lastName: "",
  active: false,
};

export type UserState = {
  userInfo: User;
  isFetching: boolean;
  isError: boolean;
};

const initialState: UserState = {
  userInfo: initialStateUser,
  isFetching: false,
  isError: false,
};

const slice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginInit: (state): void => {
      state.isFetching = true;
      state.isError = false;
      state.userInfo = initialStateUser;
    },
    loginSuccess: (state, action: PayloadAction<User>): void => {
      const user = action.payload;
      state.isFetching = false;
      state.isError = false;
      state.userInfo = user;
    },
    loginError: (state): void => {
      state.isFetching = false;
      state.isError = true;
      state.userInfo = initialStateUser;
    },
    logout: (state): void => {
      state.isFetching = false;
      state.isError = false;
      state.userInfo = initialStateUser;
    },
  },
});

export const { loginInit, loginSuccess, loginError, logout } = slice.actions;
export default slice.reducer;

// Thunk action creators
export const loginUser =
  (email: string, password: string): AppThunk =>
    async (dispatch) => {
      try {
        dispatch(slice.actions.loginInit());
        const response = await api.loginUser(email, password);
        dispatch(slice.actions.loginSuccess(response));
        showToast({ type: 'success', message: 'Bienvenido' });
      } catch (error) {
        showToast({ type: 'error', message: 'Error en las credenciales' });
        dispatch(slice.actions.loginError());
      }
    };
