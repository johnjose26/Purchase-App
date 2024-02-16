import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

interface UserDetails {
  guid: string;
   name: string;
    username: string;
     type: number;
}

const initialUserDetails: UserDetails = {guid: '', name:'', username:'', type:0};

export const login = createAsyncThunk("login",async body =>{
 
   return await fetch("http://localhost:8085/auth/login",{
      method:"POST",
      body:JSON.stringify(body),
       headers:{
      "Content-Type":"application/json"
   }}).then( response => response.json() )
   })

   export const signup = createAsyncThunk("signup",async (body: object) =>{
    return await fetch("http://localhost:8085/auth/signup",{
       method:"POST",
       body:JSON.stringify(body),
        headers:{
       "Content-Type":"application/json"
    }}).then( response => response.json() )
    })



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      userDetails: initialUserDetails,
      jwt: null,
      
    },
    reducers: {
      logOut: (state) => {
          state.userDetails = initialUserDetails;
          state.jwt = null;
          
      },
    },
  
   extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          // console.log(action);
          state.userDetails = action?.payload?.data?.data;
          state.jwt = action?.payload?.data?.jwt;
        })

    },
    
  })
  
  export const { logOut } = authSlice.actions;
  
  export default authSlice.reducer;
  