import Chat from '../Model/chat.js'
import User from '../Model/user.js';


//Api to create a new chat 
export const createChat = async(req,res)=>{
    try {
        const userId = req.user._id;

        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.name
        }

        await Chat.create(chatData)
        res.json({success:true,message:"Chat Created"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//API to get all chats for a specific user
export const getChat = async(req,res)=>{
    try {
        const userId = req.user._id;

        const chats = await Chat.find({userId}).sort({updatedAt: -1});

        res.json({success:true,chats})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//API to delete a specific chat for a specific user
export const deleteChat = async(req,res)=>{
    try {
        const userId = req.user._id;

        const {chatId} = req.body

        await Chat.deleteOne({_id:chatId,userId})
        res.json({success:true,message:"Chat Deleted"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


//Will update the get chat later for simplicity
// export const getChat = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // replenish credits if needed
//     const now = new Date();
//     const user = await User.findById(userId);

//     const hoursDiff = Math.abs(now - new Date(user.lastCreditRefresh)) / 36e5; // ms → hours
//     if (hoursDiff >= 15) {
//       user.credits = 20; // reset or replenish
//       user.lastCreditRefresh = now;
//       await user.save();
//     }

//     // get chats
//     const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

//     res.json({ success: true, chats });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// export const getChat = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // replenish credits if needed
//     const now = new Date();
//     const user = await User.findById(userId);

//     const hoursDiff = Math.abs(now - new Date(user.lastCreditRefresh)) / 36e5;
//     if (hoursDiff >= 15) {
//       user.credits = 20; 
//       user.lastCreditRefresh = now;
//       await user.save();
//     }

//     const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

//     res.json({
//       success: true,
//       chats,
//       credits: user.credits //  extra field
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };



