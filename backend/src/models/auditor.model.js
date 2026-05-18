import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
  toolName: String, // e.g. ChatGPT
  plan: String,     // Plus / Team / API
  monthlySpend: Number,
  seats: Number,
});

const recommendationSchema = new mongoose.Schema({
  toolName: String,
  currentSpend: Number,
  recommendedPlan: String,
  recommendedSpend: Number,
  savings: Number,
  reason: String,
});

const auditSchema = new mongoose.Schema({
  tools: [toolSchema],

  teamSize: Number,
  useCase: {
    type: String,
    enum: ["coding", "writing", "data", "research", "mixed"],
  },

  totalCurrentSpend: Number,
  totalOptimizedSpend: Number,
  totalSavings: Number,

  recommendations: [recommendationSchema],

  aiSummary: String,

  publicId: {
    type: String,
    unique: true,
  },

  isHighSavings: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true,
});

export const Audit = mongoose.model("Audit", auditSchema);