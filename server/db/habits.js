import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type:String,
        required:true,
    },
    completedDate:{
        type:Date,
        default:() => Date.now(),
    },
    createdAt:{
        type:Date,
        default: () => Date.now(), 
    },
    done:{
        type:Boolean,
        default:false,
    },
    donedays:{
        type:Array,
        default:[Date],
    }


  


})
const Habit = mongoose.model('habit', habitSchema)  //we created a database  habit model using taskSchema

export default Habit  //we will use it in router.js to do something in db 