import { SaleProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SaleProduct[] = []

const sellsSlice = createSlice({
    name: 'sells',
    initialState: initialState,
    reducers: {
        setSells: (_, action) => {
            return action.payload as SaleProduct[]
        },

        addSell: (state, action) => {
            return [...state, action.payload as SaleProduct]
        },
        
        removeSell: (state, action) => {
            return [...state.filter(sell => sell.id !== action.payload)]
        }
    }
})

export const { setSells, addSell, removeSell } = sellsSlice.actions

export const sellsReducer = sellsSlice.reducer

export const sellsSelector =  (state: any) => state.sells