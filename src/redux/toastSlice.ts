import { createSlice } from "@reduxjs/toolkit";


interface toastDetails{
    message:string|null;
    visible:boolean;
}

const initialToastDetails:toastDetails={
    message:null,
    visible:false
};

 const toastSlice=createSlice({
    name: 'toast',
    initialState: initialToastDetails,
    reducers: {
        handleMessage(state,action){
            state.message=action?.payload;
            state.visible=true;
        },
        handleHide(state){
            state.message=null;
            state.visible=false;
        }
    }
})

export const{handleMessage,  handleHide}=toastSlice.actions;
export default toastSlice.reducer;