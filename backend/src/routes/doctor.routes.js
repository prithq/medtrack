import express from "express"
import { auth } from "../middleware/auth.middleware.js"
import { getPatientLogs, grantAccess, getMyPatients } from "../controllers/doc.controller.js"
import { isPatient, isDoctor } from "../middleware/role.middleware.js"
const docRouter = express.Router()

docRouter.post("/grant-access", auth, isPatient, grantAccess)
docRouter.get("/my-patients", auth, isDoctor, getMyPatients)
docRouter.get("/patient/logs", auth, getPatientLogs)



export default docRouter