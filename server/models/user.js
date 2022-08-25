import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  bio: { type: String },
  hashedPassword: String,
  listOfPetsAdopted: { type: [String] },
  listOfPetsFostered: { type: [String] },
  listOfPetsSaved: { type: [String] },
  picture: String,
  role: { type: Number },
  lastConnection: { type: Date },
  ip: { type: String },
  signUpDate: { type: Date, required: true },
});

export default mongoose.model("User", userSchema);
