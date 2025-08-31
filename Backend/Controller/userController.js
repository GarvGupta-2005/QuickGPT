import User from "../Model/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs" 
import Chat from "../Model/chat.js"

//Function to Generate Token for Login
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//API to register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.json({ success: false, message: "User Already Exists!!!" })
        }

        const user = await User.create({ name, email, password })
        const token = generateToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


//API to login
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)

            if(isMatch){
                const token = generateToken(user._id);
                return res.json({success:true,token})
            }
        }
        return res.json({success:false,message:"Invalid Email or Password"})

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}


//API to get user details
// export const getUser = async (req,res)=>{
//     try {
//         const user = req.user;
//         return res.json({success:true,user})
//     } catch (error) {
//         return res.json({ success: false, message: error.message })
//     }
// }

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    // replenish logic
    const FIFTEEN_HOURS = 15 * 60 * 60 * 1000;
    const now = new Date();

    // only refill if user has 0 credits AND 15 hours passed since last refill
    if (user.credits === 0 && (!user.lastCreditRefill || (now - user.lastCreditRefill) >= FIFTEEN_HOURS)) {
      user.credits = 20; // reset to full
      user.lastCreditRefill = now; // update refill timestamp
      await user.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



//API to get published images

export const getPublishedImages = async (req,res)=>{

    try {
        const publishedImagesMessage = await Chat.aggregate([
            {$unwind:"$messages"},
            {
                $match:{
                    "messages.isImage":true,
                    "messages.isPublished":true
                }
            },
            {
                $project:{
                    _id:0,
                    imageUrl:"$messages.content",
                    userName:"$userName"
                }
            }
        ])

        res.json({success:true,images:publishedImagesMessage.reverse()})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

