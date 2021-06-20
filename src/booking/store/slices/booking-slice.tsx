import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@bookstore/common/store";
import { BookFormated } from "@bookstore/booking/model";
import * as api from "@bookstore/booking/rest/api";
import { showToast } from "@bookstore/common/utils";

export type BooksState = {
  items: BookFormated[];
  isFetching: boolean;
  isError: boolean;
  isReloadNeeded: boolean;
};

const initialState: BooksState = {
  items: [],
  isFetching: false,
  isError: false,
  isReloadNeeded: false,
};

const slice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    getBooksInit: (state): void => {
      state.isFetching = true;
      state.isError = false;
      state.isReloadNeeded = false;
      state.items = [];
    },
    getBooksSuccess: (state, action: PayloadAction<BookFormated[]>): void => {
      const books = action.payload;
      state.isFetching = false;
      state.isError = false;
      state.isReloadNeeded = false;
      state.items = books;
    },
    getBooksError: (state): void => {
      state.isFetching = false;
      state.isError = true;
      state.isReloadNeeded = false;
      state.items = [];
    },
    refreshBooks: (state): void => {
      state.isFetching = false;
      state.isError = false;
      state.isReloadNeeded = true;
    },
    cleanBooks: (state): void => {
      state.isFetching = false;
      state.isError = false;
      state.isReloadNeeded = false;
      state.items = [];
    },
  },
});

export const { refreshBooks, cleanBooks } = slice.actions;
export default slice.reducer;

// Thunk action creators
export const getBooks = (): AppThunk => async (dispatch, getState) => {
  try {
    const { sessionTokenBck, email } = getState().login.user.userInfo;
    dispatch(slice.actions.getBooksInit());
    const response = await api.getBooks(sessionTokenBck ?? "", email);
    dispatch(slice.actions.getBooksSuccess(response));
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Error al cargar los datos',
      message: 'Error en el servidor, intenta cerrar sesión y logeate de nuevo 😞'
    });
    dispatch(slice.actions.getBooksError());
  }
};
