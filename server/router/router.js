import express, { Router } from 'express'
import mongoose from 'mongoose'
import Task from '../db/tasks.js'
import Habit from '../db/habits.js'
import User from '../db/user.js'
import {check} from "express-validator"
import {signup,signin,signout} from "./usercontrollers.js"
import jwt from 'jsonwebtoken'


const router = express.Router()


//User

router.post("/users/signup",                                                       
[check("name","Name should be at least 3 characters").isLength({min:3}),    
 check("email","E-mail should be Valid").isEmail(),
 check("password","Password should be at least 6 characters").isLength({min:6}) 
],signup
)

router.post("/users/signin",signin)

router.get("/users/signout",signout)            //etkisiz islemler icin get kulllaniyoruz



router.get("/users",async (req,res)=>{
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (error) {
        console.log(error)
    }
})


router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) return
        res.status(200).json(user) //200 means everything went well 
    } catch (error) {
        console.log(error)
    }
})









//Tasks


router.get('/tasks', async (req, res) => {       //'localhost:8000/'  &  yapilan istegin url i , request and response aliyor
    try {
        const allTasks = await Task.find()     // we imported Task Model (mongodb model) and we are using it here.
        res.json(allTasks)
    } catch (error) {
        console.log(error)

    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) return
        res.status(200).json(task) //200 means everything went well 
    } catch (error) {
        console.log(error)
    }
})

router.post('/tasks', async (req, res) => {
    try {
        const task = req.body                     //get task from user with req.body 
        const createdTask = await Task.create(task) //model.create in icine kullainicinin verdigi verileri giriyoruz 
        res.status(201).json(createdTask)               //code 201 means something created 
    } catch (error) {
        console.log(error)
    }
})


router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, complete } = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('Task Couldnt found')
        const updatedTask = { title, content, complete, _id: id }

        await Task.findByIdAndUpdate(id, updatedTask, { new: true })  //new true ile we can see the updated task
        res.json(updatedTask)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id)
        res.json({ message: 'Task is deleted.' })
    } catch (error) {
        console.log(error)
    }
})
// Habits
router.get('/habits/:id', async (req, res) => {
    try {
        const { id } = req.params
        const habit = await Habit.findById(id)
        if (!habit) return
        res.status(200).json(habit) //200 means everything went well 
    } catch (error) {
        console.log(error)
    }
})
router.get('/habits', async (req, res) => {       //'localhost:8000/'  &  yapilan istegin url i , request and response aliyor
    try {
      
        const allHabits = await Habit.find()     // we imported Habit Model (mongodb model) and we are using it here.
        res.json(allHabits)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

router.post('/habits', async (req, res) => {
    try {
        const habit = req.body                     //get task from user with req.body 
        const createdHabit = await Habit.create(habit) //model.create in icine kullainicinin verdigi verileri giriyoruz 
        res.status(201).json(createdHabit)               //code 201 means something created 
    } catch (error) {
        console.log(error)
    }
})

router.put('/habits/:id',async (req,res)=> {
    try {
        const {id} = req.params
        const {title,content,completedDate,createAt,done,donedays} = req.body

        if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('Habit Couldnt found ')
        const updatedHabit = {title,content,completedDate,createAt,done,donedays,_id:id}
        await Habit.findByIdAndUpdate(id,updatedHabit,{new :true})
        res.json(updatedHabit)
    } catch (error) {
        console.log(error)
    }
})
// router.put('/habits',async (req,res)=> {
//     try {
//         const {title,content,completedDate,createAt,done} = req.body

        
//         const updatedHabit = {title,content,completedDate,createAt,done,_id:id}
//         // await Habit.findByIdAndUpdate(id,updatedHabit,{new :true})
//         await Habit.updateMany(updatedHabit,{new : true})
//         res.json(updatedHabit)
//     } catch (error) {
//         console.log(error)
//     }
// })









export default router