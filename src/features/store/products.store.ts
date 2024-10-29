import { Product } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Product[] = []

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setProducts: (_, {payload}) => {
            return [...(payload as Product[])]
        },
        addProduct: (state, {payload}) => {
            return [...state, payload]
        },
        removeProduct: (state, {payload}) => {
            return [...(state.filter(p => p.id !== payload))]
        }
    }
})

export const { setProducts, addProduct, removeProduct } = productsSlice.actions

export const productsReducer = productsSlice.reducer

export const productsSelector = (state: any) => state.products as Product[]