import express from 'express'
import { protect } from '../Middleware/auth.js'
import { imageMessageController, textMessageController } from '../Controller/messageController.js'

const messageRouter = express.Router()


messageRouter.post("/text",protect,textMessageController)
messageRouter.post("/image",protect,imageMessageController)

export default messageRouter