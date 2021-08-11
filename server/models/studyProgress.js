import mongoose from "mongoose";

const studyProgressSchema = mongoose.Schema({
  studyMaterialId: {
    type: String,
    required: true,
    default: "",
  },
  userEmailId: {
    type: String,
    required: true,
    default: "",
  },
  timeForCompletion: {
    type: Number,
    default: 3600,
  },
});

const studyProgress = mongoose.model("studyProgress", studyProgressSchema);

export default studyProgress;
