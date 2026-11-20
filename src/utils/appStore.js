/**creating appStore(Redux) */

import { configureStore } from "@reduxjs/toolkit";
import   userReducer from "./userSlice";
import   feedReducer from "./feedSlice";
import  connectionReducer from "./connectionsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,  // Adding feed reducer to the store
    connection:connectionReducer
  },


})

export default appStore