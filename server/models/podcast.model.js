import mongoose from "mongoose";

const POdcastSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    transcript:{
        type:String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    }
},{
    timestamps:true
})

const PodcastModel=mongoose.model('podcast',POdcastSchema)
export default PodcastModel;