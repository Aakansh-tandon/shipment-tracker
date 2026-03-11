import { configureStore } from "@reduxjs/toolkit";
import shipmentsReducer from "./slices/shipmentsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    shipments: shipmentsReducer,
    ui: uiReducer,
  },
});
