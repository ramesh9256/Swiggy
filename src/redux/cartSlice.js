import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        clearCart: (state, action) => {
            state.items.length = 0
        },
        removeItem: (state,action) => {
            state.items.pop()
        }
    }
})

export const{addItem,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;