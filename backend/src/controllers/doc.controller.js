import { logsModel } from "../models/logs.models.js"
import { docModel } from "../models/doc.models.js"
import { userModel } from "../models/user.models.js"

export const grantAccess = async (req, res) => {
  try {
    const { doctorEmail } = req.body;

    if (!doctorEmail) {
      return res.status(400).json({ message: "Doctor email is required" });
    }

    // Find doctor by email
    const doctor = await userModel.findOne({ email: doctorEmail, role: 'doctor' });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found with this email" });
    }

    // Check if access already exists
    const existingAccess = await docModel.findOne({
      patientId: req.user.id,
      doctorId: doctor._id
    });

    if (existingAccess) {
      return res.status(400).json({ message: "Access already granted to this doctor" });
    }

    // Create access record
    await docModel.create({
      patientId: req.user.id,
      doctorId: doctor._id,
      accessType: 'read'
    });

    res.status(200).json({ message: "Access granted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error granting access" });
  }
};

export const getMyPatients = async (req, res) => {
  try {
    // Find all patients who have granted access to this doctor
    const accessRecords = await docModel.find({ doctorId: req.user.id }).populate('patientId', 'name email _id');

    if (!accessRecords || accessRecords.length === 0) {
      return res.json([]);
    }

    // Extract patient info
    const patients = accessRecords
      .filter(record => record.patientId)
      .map(record => ({
        id: record.patientId._id,
        name: record.patientId.name,
        email: record.patientId.email,
        grantedAt: record.grantedAt
      }));

    res.json(patients);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching patients"
    });
  }
};

export const getPatientLogs = async (req, res) => {

  try {

    const patientId = req.query.patientId;


    if (!patientId) {
      return res.json({
        message: "Patient Id is required"
      })
    }

    const hasAcc = await docModel.findOne({ doctorId: req.user.id, patientId })

    if (!hasAcc) {
      return res.json({
        message: "Doctor has not the Access to this Patient"
      })
    }


    const getLogs = await logsModel.find({ patientId: patientId }).sort({ takenAt: -1 })

    res.json(getLogs)


  }

  catch (err) {
    res.json({
      message: "Error fetching the Logs"
    })
  }

}
