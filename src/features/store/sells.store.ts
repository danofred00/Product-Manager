import { SellProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SellProduct[] = []

const sellsSlice = createSlice({
    name: 'sells',
    initialState: initialState,
    reducers: {
        setSells: (_, action) => {
            return action.payload as SellProduct[]
        },

        addSell: (state, action) => {
            return [...state, action.payload as SellProduct]
        },
        
        removeSell: (state, action) => {
            return [...state.filter(sell => sell.id !== action.payload)]
        }
    }
})

export const { setSells, addSell, removeSell } = sellsSlice.actions

export const sellsReducer = sellsSlice.reducer

export const sellsSelector =  (state: any) => state.sells