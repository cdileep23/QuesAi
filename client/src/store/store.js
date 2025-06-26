import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userslice.js'
import projectReducer from './projectSlice.js'
const appStore=configureStore({
    reducer:{
        user:userReducer,
        projects:projectReducer
    }
})

export default appStore