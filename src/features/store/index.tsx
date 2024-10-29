import { PropsWithChildren } from "react";
import { store } from "./configureStore";
import { userReducer, userSelector, userSlice } from "./user.store";
import { productsSlice, productsReducer, productsSelector } from "./products.store";
import { Provider } from "react-redux";

function StoreProvider({children}: PropsWithChildren)
{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

store.subscribe(() => {
    console.log("[+] Updating state ")
})

export {
    store,
    StoreProvider,
    // User
    userSlice,
    userReducer,
    userSelector,
    // Product
    productsSlice,
    productsReducer,
    productsSelector
}