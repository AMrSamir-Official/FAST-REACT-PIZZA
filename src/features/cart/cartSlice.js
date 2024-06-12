import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}
const cartSlice = createSlice({
    name: "cart", initialState,
    reducers: {
        addItem(state, action) {

            if (state.cart.includes(action.payload.pizzaId)) console.log("she in the cart")
            state.cart.push(action.payload)
            console.log("json file", JSON.stringify(state.cart))
        },
        delItem(state, action) { state.cart = state.cart.filter(order => order.pizzaId !== action.payload) },
        increaseItemQuantity(state, action) {

            const item = state.cart.find(item => item.pizzaId = action.payload)
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice
            if (item.quantity === 0) cartSlice.caseReducers.delItem(state, action)

        },

        clearCart(state) {
            state.cart = [];
        },
    }
    ,

})

export const { addItem, delItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
export const getTotalQuintity = state => state.cart.cart.reduce((sum, curr) => sum + curr.quantity, 0)
export const getTotalPrice = state => state.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0)
export const getcart = state => state.cart.cart

// export const getQuintity = cart.find((state) => state.pizzaId === id);


//look to reselect library