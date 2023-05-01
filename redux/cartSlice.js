import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		//======== adding to cart reducer ========
		addToCart: (state, action) => {
			const itemExists = state.find((item) => {
				return item.id === action.payload.id;
			});
			if (itemExists) {
				itemExists.quantity++;
			} else {
				state.push({ ...action.payload, quantity: 1 });
			}
		},
		// ======== incrementing reducer ==========
		incrementQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload);
			item.quantity++;
		},
		//========= decrementing reducer ===========
		decrementQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload);
			if (item.quantity === 1) {
				const index = state.findIndex((item) => item.id === action.payload);
				state.splice(index, 1);
			} else {
				item.quantity--;
			}
		},
		//========= removing reducer ===========
		removeFromCart: (state, action) => {
			const index = state.findIndex((item) => item.id === action.payload);
			state.splice(index, 1);
		},
	},
});

//reducer for visibility state of cart panel
const visibilitySlice = createSlice({
	name: "visibility",
	initialState: {
		isOpen: false,
	},
	reducers: {
		openCart: (state) => {
			state.isOpen = true;
		},
		closeCart: (state) => {
			state.isOpen = false;
		},
	},
});

export const cartReducer = cartSlice.reducer;

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} = cartSlice.actions;

export const visibilityReducer = visibilitySlice.reducer;
export const { openCart, closeCart } = visibilitySlice.actions;
