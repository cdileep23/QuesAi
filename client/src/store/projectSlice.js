import { createSlice } from "@reduxjs/toolkit";

const projectSlice=createSlice({
    name:"project",
    initialState:null,
    reducers:{
        AddProjects:(state,action)=>{
            return action.payload
        },
        resetProjecs:()=>{
            return null
        }
    }
})

export const{AddProjects,resetProjecs}=projectSlice.actions

export default projectSlice.reducer