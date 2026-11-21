import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({

  name:"request",
  initialState: null,
  reducers : {
    addRequest: (state,action) =>{
         return action.payload;
      },
      /**when we see what are the all request we have received 
       *  once we request its our call to accept or rreject it 
       * once wwe do both accpet or reject wwe shoul remove that card from feed 
       * we shouldn't see tht cardd in request further on it should be removed fron request
       * 
       */
     removeRequest:(state,action)=>{
        const newArray = state.filter(r => r._id !== action.payload);
        return newArray;
     }
    }
   
})

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer; 