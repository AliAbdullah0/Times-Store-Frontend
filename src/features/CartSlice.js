import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    id:nanoid(),
    item:[
        {
            id:1,
            item:String,
        }
    ],
    totalPrice:0,
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            const item = action.payload
            const itemId = state.item.map((item)=>item.id)
            const product = state.item.map((item)=>item.item)
            state.totalPrice + action.payload.price
            return item,itemId,product,state.totalPrice
        },
        removeFromCart(state,action){
            const itemId = state.item.map((item)=>item.id)
            item.filter(action.payload.id !== itemId)
        }
    }
})