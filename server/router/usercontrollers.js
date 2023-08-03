import User from "../db/user.js";
import {validationResult} from "express-validator"
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'



export const signup =  async (req,res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array()[0].msg
            })
        }
        const user = new User (req.body)
         const createdUser = await User.create(user)
        res.status(201).json(createdUser)
    } catch (error) {
        console.log(error)
        
    }
}




export const signin = async (req,res) => {
    try {
        const {email,password} = req.body
        const foundUser = await User.findOne({email})
            if(  !foundUser){
                return res.status(400).json({
                    error:"Email was not found"
                })
            }
             //Authenticate
        if (!foundUser.authenticate(password) )   {              //in the  db model as a method 
            return res.status(400).json({
                error:"Email and Password does not match"
            })
        }
        
        //Create token
        const token = jwt.sign({_id: foundUser._id},process.env.SECRET)      //with user id we will create a token 

        //put token in a cookie

        res.cookie('token',token,{expire:new Date() + 1})   //we call 'token' to the response and 3rd parameter is when is the token will  be expired ,24h

        //send response 
        const {_id, name,email: foundUserEmail} = foundUser 
        return res.json({
            token,
            user:{
                _id,
                name,
                email,
            }
        })
        

    } catch (error) {
        console.log(error)
    }
}


export const signout =  async (req,res) => {
    res.clearCookie("token")                              //we are cleaning the cookie that we call "token" 
    return res.json({
        message:"User sign out is successful"
    })
}