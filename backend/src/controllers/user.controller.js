import { userModel } from "../models/user.models.js"
export const getProfile = (req, res) => {

  return res.json(req.user)


}

export const updateProfile = async (req, res) => {
  try {

    const newName = req.body.name;
    const newAge = req.body.age
    const newgender = req.body.gender

    const currUser = req.user

    const success = await userModel.findByIdAndUpdate(currUser.id, {
      name: newName,
      age: newAge,
      gender: newgender
    })


    if (success)
      return res.json({
        message: "Profile Updated Succesfully"
      })

  }
  catch (err) {
    res.json({
      message: "Error Updating the Profile"
    })
  }

}
