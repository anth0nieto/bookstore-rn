import { combineReducers } from "redux";
import userReducer from "@bookstore/login/store/slices/user-slice";

export default combineReducers({
  user: userReducer,
});
