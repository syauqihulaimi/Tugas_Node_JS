import mongoose from "mongoose";

const { Schema } = mongoose;
const contact = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

export const Contact = mongoose.model("Contact", contact);