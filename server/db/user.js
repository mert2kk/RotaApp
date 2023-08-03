import mongoose from "mongoose";
import crypto from "crypto";
import { v1 as uuidv1 } from 'uuid';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlenght:32,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        maxlenght:32,
        trim:true,

    },
     email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    }, 
    encryepted_password:{
        type:String,
        required:true,
    },
    salt:String,
},{timestamps:true})                         //we need to know when the users was created



userSchema.virtual("password")
.set(function(password)  {
    this._password = password,
    this.salt = uuidv1(),      //it is gonna create automatic id uuidv1
    this.encryepted_password = this.securePassword(password)

})
.get(function(){
    return this._password

})


userSchema.methods = {
    authenticate :function(plainpassword)  {
        return this.securePassword(plainpassword)===this.encryepted_password
    },
    securePassword:function(plainpassword)  {
        if(!plainpassword) return ""

        try {
            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex")
        } catch (error) {
            console.log(error)
        }
    } 
    


}

const User = mongoose.model("user",userSchema)

export default User



