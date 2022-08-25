import mongoose from "mongoose";

const petModel = mongoose.Schema({
  name: { type: String, required: true },
  picture: String,
  sex: String,
  age: String,
  hypoallergenic: String,
  type: { type: String, required: true },
  adoptionStatus: { type: String, required: true },
  adoptionOwner: { type: String },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bio: { type: String },
  dietryRestrictions: String,
  color: String,
  breed: String,
});

export default mongoose.model("PetModel", petModel, "petmodel");
