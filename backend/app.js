import express from "express"
import cors from "cors"
import authRouter from "./src/routes/auth.routes.js"
import docRouter from "./src/routes/doctor.routes.js"
import logRouter from "./src/routes/logs.routes.js"
import publicRouter from "./src/routes/public.routes.js"
import userRouter from "./src/routes/user.routes.js"
const app = express()
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/doc", docRouter)
app.use("/api/log", logRouter)
app.use("/api/public", publicRouter)
app.use("/api/user", userRouter)



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running"
  })
})




export default app;