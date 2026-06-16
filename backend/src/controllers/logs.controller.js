import { logsModel } from "../models/logs.models.js"

export const getPatientLogs = async (req, res) => {
  try {
    const logs = await logsModel
      .find({ patientId: req.user.id })
      .sort({ takenAt: -1 })

    return res.status(200).json(logs)
  } catch (err) {
    res.status(500).json({
      message: "Error fetching patient logs"
    })
  }
}

export const addLog = async (req, res) => {
  try {
    const { medicineName, dosage, status, note } = req.body

    if (!medicineName) {
      return res.status(400).json({
        message: "Medicine name is required"
      })
    }

    await logsModel.create({
      patientId: req.user.id,
      medicineName,
      dosage,
      status,
      note
    })

    res.status(201).json({
      message: "Log created successfully"
    })
  } catch (err) {
    res.status(500).json({
      message: "Unable to add log"
    })
  }
}

export const deleteLog = async (req, res) => {
  try {
    const { logId } = req.params

    const log = await logsModel.findOne({
      _id: logId,
      patientId: req.user.id
    })

    if (!log) {
      return res.status(404).json({
        message: "Log not found"
      })
    }

    await logsModel.deleteOne({ _id: logId })

    res.status(200).json({
      message: "Log deleted successfully"
    })
  } catch (err) {
    res.status(500).json({
      message: "Unable to delete log"
    })
  }
}
