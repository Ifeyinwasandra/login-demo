import { configureStore } from "@reduxjs/toolkit";
import loginSlice from '../reducer/loginSlice'


export const store = configureStore({
    reducer: {
        login: loginSlice
    },
})