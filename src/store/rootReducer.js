import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { createAction } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import documentReducer from "./documentSlice";
import userReducer from "./userSlice";

const combinedReducers = combineReducers({
  counter: counterReducer,
  document: documentReducer,
  user: userReducer,
});

export const logout = createAction("user/logout");

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    // check for action type
    state = undefined;
  }
  return combinedReducers(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export default persistReducer(persistConfig, rootReducer);
