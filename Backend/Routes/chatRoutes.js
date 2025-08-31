import express from 'express'

import {getChat,deleteChat,createChat} from '../Controller/chatController.js'

import {protect} from '../Middleware/auth.js'

const chatRouter = express.Router()

chatRouter.get('/create',protect,createChat)
chatRouter.get('/get',protect,getChat)
chatRouter.post('/delete',protect,deleteChat)

export default chatRouter