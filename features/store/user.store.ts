import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState : User = {
    firstname: 'John',
    lastname: 'Doe',
    image: '',
    description: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, {payload}) => {
            const [firstname, lastname] = String(payload).split(',')

            return {...state, firstname, lastname}
        },
        setImage: (state, {payload}) => {
            return {...state, image: payload}
        },
        setDescription: (state, {payload}) => {
            return {...state, description: payload}
        },
        setUser: (_, {payload}) => {
            return {...payload}
        }
    }
})

export const { setName, setDescription, setImage, setUser } = userSlice.actions

export const userReducer = userSlice.reducer

export const userSelector = (state: any) => state.user as User