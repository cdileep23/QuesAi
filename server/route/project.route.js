import express from "express"
import { IsAuthenticated } from "../Middleware/Middleware.js";
import { CreateProject, getAllProjects } from "../controllers/project.controller.js";

const projectRouter=express.Router()

projectRouter.route('/get-all').get(IsAuthenticated,getAllProjects)
projectRouter.route('/create-project').post(IsAuthenticated,CreateProject)

export default projectRouter