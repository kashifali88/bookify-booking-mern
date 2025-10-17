import bcrypt from "bcryptjs"
import  User  from "../models/User.js"



export const updateUser = async(req,res,next) => {
    try {
        await User.findByIdAndUpdate(req.params.id,{$set: req.body, new: true})
        res.status(200).json('User updated')
    } catch (error) {
        next(error)
    }
}

export const findUser = async(req,res,next)=> {
    try {
      const user =   await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const findAllUsers = async(req,res,next)=> {
    try {
      const users =   await User.find()
      res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted')
    } catch (error) {
        next(error)
    }
}