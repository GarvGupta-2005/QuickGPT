import mongoose from "mongoose";
import bcrypt from 'bcryptjs'



const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 15 },
  lastCreditRefill: { type: Date, default: Date.now() }, // NEW FIELD
});

//Hash Password before saving it to db
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model('User',userSchema);
export default User;