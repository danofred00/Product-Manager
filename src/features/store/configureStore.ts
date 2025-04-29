import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user.store";
import { productsReducer } from "./products.store";
import { deliveriesReducer } from "./deliveries.store";
import { sellsReducer } from "./sells.store";

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        deliveries: deliveriesReducer,
        sells: sellsReducer
    }
})