import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    id:1,
    items:[],
    totalPrice:0,
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            
        }
    }
})