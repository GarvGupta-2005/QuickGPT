import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './Configs/db.js'
import userRouter from './Routes/userRoutes.js'
import chatRouter from './Routes/chatRoutes.js'
import messageRouter from './Routes/messageRoutes.js'

const app = express()

await connectDB()

//Middleware

app.use(cors())
app.use(express.json())


//Routes
app.get('/',(req,res)=>{
    res.send("Hello From Backend")
})

app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)

const PORT = process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})