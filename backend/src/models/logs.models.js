
import mongoose from "mongoose"
const schema=mongoose.Schema

const logSchema = new schema({
  
  patientId: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  medicineName: String,
  dosage: String,
  status: {
    type: String,
    enum: ["taken", "missed", "late"],
    default: "taken"
  },
  note: String,
  takenAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })


export const logsModel=mongoose.model("logs",logSchema)