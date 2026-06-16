import crypto from "crypto"
import { pubModel } from "../models/public.models.js"
import { logsModel } from "../models/logs.models.js"
export const getTimeLine = async (req, res) => {

  try {

    const token = req.params.token

    const getUser = await pubModel.findOne({
      token: token
    })

    if (!getUser || getUser.expiresAt < new Date()) {
      return res.status(404).send("Token Is Invalid or Expired")
    }

    const patientId = getUser.patientId

    const logs = await logsModel.find({
      patientId: patientId
    }).sort({ takenAt: -1 })


    res.json(logs)


  }


  catch (err) {

    res.json({
      message: "Unable to fetch Patient Logs"
    })

  }

}

export const createToken = async (req, res) => {

  try {

    const token = crypto.randomUUID()

    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    )

    const tokenCreated = await pubModel.create({
      patientId: req.user.id,
      token: token,
      expiresAt: expiresAt

    })

    if (tokenCreated)
      res.json({
        message: "Token Created Succesfully",
        token: token
      })


  } catch (err) {
    res.json({
      message: "Unable to create token"
    })
  }


}
