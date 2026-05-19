import mongoose from "mongoose";

//  Plan Schema
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Plus, Team, Pro, etc.
  },
  pricePerUser: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["monthly", "yearly", "api"],
    default: "monthly",
  }
}, { _id: false });

// Pricing Schema
const pricingSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: true,
    unique: true, // one tool = one document
  },

  plans: {
    type: [planSchema],
    required: true,
  },

  sourceUrl: {
    type: String,
    required: true, // assignment requirement
  },

  lastVerified: {
    type: Date,
    required: true, // credibility
  }

}, {
  timestamps: true,
});

export const PRICING = mongoose.model("Pricing", pricingSchema);