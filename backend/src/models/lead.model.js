import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  companyName: {
    type: String,
  },
  role: {
    type: String,
  },
  teamSize: {
    type: Number,
  },
  auditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audit",
  },
}, {
  timestamps: true,
});

export const Lead = mongoose.model("Lead", leadSchema);