import { PropsWithChildren } from "react";
import { store } from "./configureStore";
import { userReducer, userSelector, userSlice } from "./user.store";
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
    console.log("[+] Saving state : ", store.getState())
})

export {
    store,
    userSlice,
    userReducer,
    userSelector,
    StoreProvider,
}