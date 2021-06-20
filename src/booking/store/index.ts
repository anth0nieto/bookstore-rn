import { combineReducers } from "redux";
import bookingReducer from "@bookstore/booking/store/slices/booking-slice";

export default combineReducers({
  list: bookingReducer,
});
