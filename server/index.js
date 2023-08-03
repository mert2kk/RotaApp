import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from "./router/router.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

const app = express()
app.use(cors())
app.use(express.json())   // we will parse the data string to json //express.json is middleware in express 
app.use(cookieParser())
app.use(bodyParser.json())
dotenv.config() 

// app.use('/tasks', router) // " we can use the router in /tasks URL route "
// app.use('/habits', router) // " we can use the router in /habits URL route "
app.use('/',router)

app.listen(process.env.PORT, () => {     //when listen to 8000 port we want to connect to the database  with mongoose
    mongoose.connect(process.env.MONGO_URI, {
        //  for the deprecation warnings // konsoldaki cikacak bazi hatalarin onune gecmis oluyoruz 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log('connected to db'))
        .catch((err) => console.log(err))
})