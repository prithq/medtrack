import express from "express"
import {auth} from "../middleware/auth.middleware.js"
import { getProfile,updateProfile } from "../controllers/user.controller.js"
const userRouter=express.Router()

userRouter.put("/getme",auth,getProfile)
userRouter.put("/update",auth,updateProfile)




export default userRouter