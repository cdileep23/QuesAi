import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:null,
    reducers:{
        UserLoggedIn:(state,action)=>{
            return action.payload
        },
        UserLoggedOut:()=>{
            return null
        }
    }
})


export const{UserLoggedIn,UserLoggedOut}=userSlice.actions
export default userSlice.reducer