
/**we have created appStore and creating slice  */


import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
     addUser: (state,action)=>{
         return action.payload;
     },
     removeUser: (state,action)=>{
         return null;
     }
  }
})

/**adding actions 2 operations to perform 1.adduser and removeuser */
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;