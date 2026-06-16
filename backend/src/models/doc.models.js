import mongoose from "mongoose"
const schema=mongoose.Schema


const DoctorView=new schema({
  patientId: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  doctorId: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  accessType: {
    type: String,
    default: "read"
  },

  grantedAt: {
    type: Date,
    default: Date.now
  }
})

export const docModel=mongoose.model("docview",DoctorView)

