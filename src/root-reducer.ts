import { combineReducers } from "redux";
import loginReducer from "@bookstore/login/store";
import bookingReducer from "@bookstore/booking/store";

export default combineReducers({
  login: loginReducer,
  books: bookingReducer,
});
