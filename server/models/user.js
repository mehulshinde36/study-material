import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  phno: {
    type: Number,
    required: true,
    unique: true,
  },
  firebaseObj: {},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const user = mongoose.model("user", userSchema);

export default user;
