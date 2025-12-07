import { configureStore } from "@reduxjs/toolkit";
import useReducer1 from "./slices/doctors";
import useReducer2 from "./slices/hospital";
import useReducer3 from "./slices/news";
import useReducer4 from "./slices/latest.news";


const store = configureStore({
  reducer: {
    doctors: useReducer1,
    hospitals: useReducer2,
    xabarlar: useReducer3,
    oxirgixabarlar: useReducer4,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




