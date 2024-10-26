import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user.store";
import { productsReducer } from "./products.store";

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer
    }
})