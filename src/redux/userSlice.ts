import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHandler } from "./handleFetch.ts";
import { logOut } from "./authSlice.ts";

export interface User {
   guid: string;
   name: string;
   type: number;
   username: string;
  
}

interface InitialState {
   userList: Array<User>
}

const initialState: InitialState = { userList: [] };
   

export const getUsers = createAsyncThunk("getUsers", async (_, state : any) => {
  return fetchHandler(state,"http://localhost:8085/users/list","GET", {} );
})

export const deleteUser =  createAsyncThunk("deleteUser", async (guid, state : any) => {
   return fetchHandler(state,`http://localhost:8085/users/remove`,"DELETE", {guid} );
 })


export const userSlice = createSlice({
   name: 'users',
   initialState,

   reducers: {

   },

   extraReducers: (builder) => {
      builder
         .addCase(getUsers.fulfilled, (state, action) => {
            console.log(action);
            state.userList = action?.payload?.data?.data;
         })
       
         
   },

})


export default userSlice.reducer;
