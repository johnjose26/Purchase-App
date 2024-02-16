import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHandler } from "./handleFetch.ts";


export interface ProductItem {
   guid: string;
   name: string;
   details: string;
   image: string;
   count: number;
   rating: number;
   imageName?: string;
}

interface InitialState {
   productList: Array<ProductItem>
}

const initialState: InitialState = { productList: [] };
   

export const getProducts = createAsyncThunk("getProducts", async (_, state : any) => {
  return fetchHandler(state,"http://localhost:8085/products/list","GET", {} );
})

export const deleteProduct = createAsyncThunk("deleteProduct", async(guid, state: any) => {
   return fetchHandler(state, "http://localhost:8085/products/remove","DELETE", {guid})
})

export const addProduct = createAsyncThunk("addProduct", async(body: object, state: any) => {
   return fetchHandler(state,"http://localhost:8085/products/add","POST", body)
})

export const editProduct = createAsyncThunk("editProduct", async(body: object, state: any) => {
   return fetchHandler(state,"http://localhost:8085/products/edit","POST", body)
})



export const productSlice = createSlice({
   name: 'products',
   initialState,

   reducers: {

   },

   extraReducers: (builder) => {
      builder
         .addCase(getProducts.fulfilled, (state, action) => {
            // console.log(action);
            state.productList = action?.payload?.data?.data;

         })

   },

})


export default productSlice.reducer;
