import PodcastModel from "../models/podcast.model.js";
import ProjectModel from "../models/project.model.js";
export const getPodcastsByProjectId=async(req,res)=>{
    try {
        const {projectId}=req.params;
   if(!projectId){
    return res.status(500).json({
      success: false,
      message: "Project Id is required",
    });
   }

   const podcasts=await PodcastModel.find({
    projectId
   })

   return res.status(200).json({
    success:true,
    message:"Retreived Podcasts with projectId",
    podcasts
   })


         

    } catch (error) {
         console.error(error);
         return res.status(500).json({
           success: false,
           message: "Internal Server Error",
         });
    }
}

export const AddPodacst=async(req,res)=>{
    try {
         const { projectId ,name,transcript} = req.body;
         if (!projectId || !name|| !transcript) {
           return res.status(500).json({
             success: false,
             message: "Project Id , name , transcript all are required",
           });
         }

         const newPodcast=await PodcastModel.create({
            projectId,name,transcript
         })
          return res.status(201).json({
            message:"Podcast Created Successfully",
            success:true,
            podcast:newPodcast
          })


        


    } catch (error) {
         console.error(error);
         return res.status(500).json({
           success: false,
           message: "Internal Server Error",
         });
    }
}

export const getPodcastById=async(req,res)=>{
   try {
      
        const { podcastId } = req.params;
        const userId = req.userId;

        if (!podcastId) {
          return res.status(400).json({
            success: false,
            message: "Podcast ID is required",
          });
        }

       

        const podcast = await PodcastModel.findById(podcastId);
        if (!podcast) {
          return res.status(404).json({
            success: false,
            message: "Podcast not found",
          });
        }

        const project = await ProjectModel.findById(podcast.projectId);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: "Parent project not found",
          });
        }

        if (project.userId.toString() !== userId) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized to update this podcast",
          });
        }

      

        return res.status(200).json({
          success: true,
          message: "Podcast updated successfully",
          podcast
        });
   } catch (error) {
    
   } 
}



export const deletePodcast = async (req, res) => {
  try {
    const { podcastId } = req.params;
    const userId = req.userId;

    if (!podcastId) {
      return res.status(400).json({
        success: false,
        message: "podcastId is required",
      });
    }

    const podcast = await PodcastModel.findById(podcastId);
    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: "Podcast not found",
      });
    }

    
    const project = await ProjectModel.findById(podcast.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Parent project not found",
      });
    }


    if (project.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this podcast",
      });
    }

 
    await PodcastModel.findByIdAndDelete(podcastId);

    return res.status(200).json({
      success: true,
      message: "Podcast deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const editPodcast = async (req, res) => {
  try {
    const { transcript } = req.body;
    const { podcastId } = req.params;
    const userId = req.userId;

    if (!podcastId) {
      return res.status(400).json({
        success: false,
        message: "Podcast ID is required",
      });
    }

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    const podcast = await PodcastModel.findById(podcastId);
    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: "Podcast not found",
      });
    }

    const project = await ProjectModel.findById(podcast.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Parent project not found",
      });
    }

    if (project.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this podcast",
      });
    }

    
    const updatedPodcast = await PodcastModel.findByIdAndUpdate(
      podcastId,
      { transcript },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Podcast updated successfully",
      podcast: updatedPodcast,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
