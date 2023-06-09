import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { cartReducer, visibilityReducer } from "./cartSlice";

const persistConfig = {
	key: "root",
	storage, //store data in localStorage
};
//root reducer with two reducers combined together
const rootReducer = combineReducers({
	cart: cartReducer,
	visibility: visibilityReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk], //thunk middleware to prevent error: a non-serializable value was detected in the state
});

export const persistor = persistStore(store);
