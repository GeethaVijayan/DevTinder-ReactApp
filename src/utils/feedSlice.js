import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers: {
      addFeed: (state,action) =>{
         return action.payload;
      },
       removeUserFromFeed: (state,action) =>{
        /**removeUSerFrom Feed it will display all data in feed we are taking full feed and remove the feed which matches the id 
         * --
         * Logged in user Jason 
         *  sent interested message to Jyothika
         * then in all feed i should remove jyothika because i already sent her a request 
         * For that after i'm giving send interested requested immedaitaely i  need to remove that user from feed .
         * 
         * 
         */
          return state.filter((user) => user._id !== action.payload);
      }
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;