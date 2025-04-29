import { DeliveryProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DeliveryProduct[] = []

const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState: initialState,
    reducers: {
        setDeliveries: (_, action) => {
            return action.payload as DeliveryProduct[]
        },

        addDelivery: (state, action) => {
            return [...state, action.payload as DeliveryProduct]
        },
        
        removeDelivery: (state, action) => {
            return [...state.filter(delivery => delivery.id !== action.payload)]
        }
    }
})

export const { setDeliveries, addDelivery, removeDelivery } = deliveriesSlice.actions

export const deliveriesReducer = deliveriesSlice.reducer

export const deliveriesSelector =  (state: any) => state.deliveries