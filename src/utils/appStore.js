/**creating appStore(Redux) */

import { configureStore } from "@reduxjs/toolkit";
import   userReducer from "./userSlice";
import   feedReducer from "./feedSlice";


const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,  // Adding feed reducer to the store
  },


})

export default appStore