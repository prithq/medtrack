
import mongoose from "mongoose"
const schema=mongoose.Schema

const PublicView=new schema({
  patientId: {
  type: schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  token: {
    type: String,
    required: true,
    unique: true
  },

  expiresAt: {
    type: Date,
    required: true
  }
},{timestamps:true})

export const pubModel=mongoose.model("pubview",PublicView)