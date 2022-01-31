import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  typeOfLike: { type: String, required: true, default: "like" }, // love , angry, like...
  placeId: { type: mongoose.Types.ObjectId, required: true, ref: "Place" },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.model("Like", likeSchema);
