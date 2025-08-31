
import Chat from "../Model/chat.js"
import openai from "../Configs/openai.js"
import User from "../Model/user.js"
import axios from "axios"
import imagekit from '../Configs/imagekit.js'

//Text Based AI Chat Message Controler

export const textMessageController = async (req, res) => {

    try {

        const userId = req.user._id


        if(req.user.credits<1){
            return res.json({success:false,message:"Not Enough Creds to use this feature"})
        }

        const { chatId, prompt } = req.body

        

        const chat = await Chat.findOne({ userId, _id: chatId })

        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false })


        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            reasoning_effort: "low",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });


        const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }

        res.json({ success: true, reply })

        chat.messages.push(reply)

        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })


    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


//Image Generation 

export const imageMessageController = async (req,res)=>{

    try {
        const userId = req.user._id

        //Credit check
        if(req.user.credits<2){
            return res.json({success:false,message:"Not Enough Creds to generate an image"})
        }

        const {prompt,chatId,isPublished} = req.body

        //Find chat

        const chat = await Chat.findOne({userId,_id:chatId}); 

        //push user message
        chat.messages.push({
            role:"user",
            content:prompt,
            timestamp:Date.now(),
            isImage:false
        })

        //Encode the prompt
        const encodedPropmt = encodeURIComponent(prompt)

        //Construct ImageKIT AI generation

        const generatedImageURL = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPropmt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`


        //Generation 
        const aiImageResponse =  await axios.get(generatedImageURL,{responseType:"arraybuffer"})

        //convert to base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString("base64")}`

        //Upload to imageKIT

        const uploadResponse = await imagekit.upload({
            file:base64Image,
            fileName:`${Date.now()}.png`,
            folder:"quickgpt"
        })

        const reply = {
            role:"assistant",
            content:uploadResponse.url,
            timestamp:Date.now(),
            isImage:true,
            isPublished
        }

        res.json({success:true,reply})

        chat.messages.push(reply)

        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })

    } catch (error) {
        res.json({ success: false, message:"Why This Shit" })

    }
}