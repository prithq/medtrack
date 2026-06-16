import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { userModel } from "../models/user.models.js"

export const registerUser = async (req, res) => {

  try {

    const { name, email, role, password, gender, age } = req.body

    const userExist = await userModel.findOne({
      email
    })

    if (userExist)
      return res.status(400).json({
        message: "User Already exist"
      })

    const hashedPass = await bcrypt.hash(password, 10)

    const user = await userModel.create({ name, email, role, password: hashedPass, gender, age })

    res.status(201).json({ message: "User is Registered" })

  } catch (err) {
    res.status(500).json({ message: "Server Error" })
  }
}

export const loginUser = async (req, res) => {

  try {

    const email = req.body.email
    const password = req.body.password

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    const truePass = await bcrypt.compare(password, user.password)

    if (!truePass)
      return res.status(401).json({ message: "Password is Wrong" })

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET)

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    })

  } catch (err) {

    res.status(500).json({ message: "Error In Logging the User" })

  }

}

export const getUser = (req, res) => {

  return res.json(req.user)

}
