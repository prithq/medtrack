import express from "express"
import {auth} from "../middleware/auth.middleware.js"
import { isPatient } from "../middleware/role.middleware.js"
import {createToken,getTimeLine} from "../controllers/public.controller.js"
const publicRouter=express.Router()

publicRouter.post("/create",auth,isPatient,createToken)
publicRouter.get("/timeline/:token",getTimeLine)


export default publicRouter