/**creating appStore(Redux) */

import { configureStore } from "@reduxjs/toolkit";
import   userReducer from "./userSlice";
import   feedReducer from "./feedSlice";
import  connectionReducer from "./connectionsSlice";
import  requestReducer from "./requestSlice";


const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,  // Adding feed reducer to the store
    connection:connectionReducer,
    request:requestReducer,
  },


})

export default appStore