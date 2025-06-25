import express from "express"
import { IsAuthenticated } from "../Middleware/Middleware.js"
import { AddPodacst, deletePodcast, editPodcast, getPodcastsByProjectId } from "../controllers/podcast.controller.js"

const podcastRouter=express.Router()

podcastRouter.route('/:projectId/get-all').get(IsAuthenticated,getPodcastsByProjectId)
podcastRouter.route('/:podcastId').post(IsAuthenticated,AddPodacst).patch(IsAuthenticated,editPodcast).delete(IsAuthenticated,deletePodcast)
export default podcastRouter