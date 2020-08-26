import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import documentReducer from "./documentSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    document: documentReducer,
  },
  devTools: true,
});
