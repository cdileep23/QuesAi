import express from "express"
import { IsAuthenticated } from "../Middleware/Middleware.js"
import { Login, Logout, signIn, UserProfile } from "../controllers/user.controller.js"
const UserRouter=express.Router()

UserRouter.route('/sign-in').post(signIn)
UserRouter.route('/login').post(Login)
UserRouter.route('/logout').get(IsAuthenticated,Logout)
UserRouter.route('/profile').get(IsAuthenticated,UserProfile)

export default UserRouter