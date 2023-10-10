import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Event", EventSchema);
