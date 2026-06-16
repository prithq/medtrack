import mongoose from "mongoose"
const schema=mongoose.Schema

const User=new schema({

  name:{
    type:String,
    required:true  
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
 role:{
  type:String,
  enum:["patient","doctor"],
  required:true
 },
  age:Number,
  gender:String,
  
},{timestamps:true})


export const userModel=mongoose.model("user",User)