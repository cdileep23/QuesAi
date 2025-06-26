import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
    },

email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
}
},{timestamps:true})

const UserModel=mongoose.model('user',UserSchema)
export default UserModel