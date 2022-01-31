import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  datePub: { type: Date, default: Date.now() },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  placeId: { type: mongoose.Types.ObjectId, ref: "Place", required: true },
});

export default mongoose.model("Comment", commentSchema);
