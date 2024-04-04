import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken : String,
  forgotPasswordTokenExpiry : Date,
  verifyToken : String,
  verifyTokenExpiry : Date,
});


const User = mongoose.models.users || mongoose.model("users",UserSchema)

export default User;