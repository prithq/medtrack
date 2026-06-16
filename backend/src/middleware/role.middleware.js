export const isPatient = (req, res, next) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({
        message: "Only patients are allowed"
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
      message: "Role verification failed"
    })
  }
}

export const isDoctor = (req, res, next) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "Only doctors are allowed"
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
      message: "Role verification failed"
    })
  }
}
