import mongoose from "mongoose";
import ProjectModel from "../models/project.model.js";
import UserModel from "../models/user.model.js";

export const getAllProjects = async (req, res) => {
  try {
    const userId = req.userId;

    

    const projectsWithPodcasts = await ProjectModel.aggregate([
      {
        $match: { userId:  mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "podcast",
          localField: "_id",
          foreignField: "projectId",
          as: "podcast", 
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      projects: projectsWithPodcasts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const CreateProject = async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name Cannot be Empty",
        success: false,
      });
    }


    const newProject = await ProjectModel.create({ userId, name });

    return res.status(201).json({
      message: "Successfully Created the Project",
      success: true,
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
