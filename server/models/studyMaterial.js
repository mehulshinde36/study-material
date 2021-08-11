import mongoose from "mongoose";

const studyMaterialSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  pdfUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const studyMaterial = mongoose.model("studyMaterial", studyMaterialSchema);

export default studyMaterial;
