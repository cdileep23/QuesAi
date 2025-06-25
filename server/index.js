import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js"
import UserRouter from './route/user.route.js'
import ProjectRouter from "./route/project.route.js";
import podcastRouter from "./route/podcast.route.js";
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()
const app=express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "*", 
    credentials: true, 
  })
);
app.use('/api/v1/user', UserRouter)
app.use("/api/v1/project", ProjectRouter);
app.use('/api/v1/podcast',podcastRouter)
app.use('/',(req,res)=>{
    res.send("Hello from Backed")
})
const startServer = async()=>{
    try {
        await connectDB();
        app.listen(PORT, () => {
          console.log(`server started at ✅ ${PORT}`);
        });
        
    } catch (error) {
        console.log(error)
    }
}
startServer()
