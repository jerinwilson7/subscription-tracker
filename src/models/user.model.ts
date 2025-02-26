import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 2,
      maxLength: 25,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minlength: 5,
      maxLength: 25,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

  const User = mongoose.model("User",userSchema)


export default User;