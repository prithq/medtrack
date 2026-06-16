import express from "express"
import {auth} from "../middleware/auth.middleware.js"
import { isPatient } from "../middleware/role.middleware.js"
import { addLog,deleteLog,getPatientLogs } from "../controllers/logs.controller.js"
const logRouter=express.Router()

logRouter.post("/add",auth,isPatient,addLog)
logRouter.delete("/delete/:logId",auth,isPatient,deleteLog)
logRouter.get("/get",auth,isPatient,getPatientLogs)



export default logRouter