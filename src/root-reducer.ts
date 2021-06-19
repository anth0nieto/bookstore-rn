import { combineReducers } from "redux";
import loginReducer from "@bookstore/login/store";

export default combineReducers({
  login: loginReducer,
});
