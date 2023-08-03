import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: String,

    },


})
const Task = mongoose.model('task', taskSchema)  //we created a database  Task model using taskSchema

export default Task   //we will use it in router.js to do something in db 