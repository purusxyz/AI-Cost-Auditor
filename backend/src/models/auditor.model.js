import mongoose from "mongoose";

 // User Input Schema

const toolSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: true,
  },
  plan: {
    type: String, // current user plan
  },
  monthlySpend: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    default: 1,
  }
}, { _id: false });


 //  Engine Output Schema
const recommendationSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: true,
  },

  currentPlan: String,
  currentSpend: Number,

  recommendedPlan: String,
  recommendedSpend: Number,

  savings: Number,

  savingsPercent: Number,

  reason: {
    type: String,
    required: true, // critical for assignment
  },

  tag: {
    type: String,
    enum: [
      "OVERKILL_PLAN",
      "UNDERUTILIZED",
      "CHEAPER_ALTERNATIVE",
      "OPTIMAL"
    ],
    default: "OPTIMAL",
  },

  confidence: {
    type: Number, // 0 → 1
    default: 0.8,
  }

}, { _id: false });

//  Main Audit Schema

const auditSchema = new mongoose.Schema({
  tools: {
    type: [toolSchema],
    required: true,
  },

  teamSize: {
    type: Number,
    required: true,
  },

  useCase: {
    type: String,
    enum: ["coding", "writing", "data", "research", "mixed"],
    required: true,
  },

  totalCurrentSpend: {
    type: Number,
    required: true,
  },

  totalOptimizedSpend: {
    type: Number,
    required: true,
  },

  totalSavings: {
    type: Number,
    required: true,
  },

  recommendations: {
    type: [recommendationSchema],
    required: true,
  },

  aiSummary: {
    type: String, // optional (LLM)
  },

  publicId: {
    type: String,
    required: true,
    unique: true,
    index: true, // for fast lookup
  },

  isHighSavings: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true,
});

export const Audit = mongoose.model("Audit", auditSchema);