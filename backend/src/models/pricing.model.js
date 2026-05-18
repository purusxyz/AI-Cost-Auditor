import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  toolName: String,
  plans: [
    {
      name: String,
      pricePerUser: Number,
      type: String, // monthly / api
    }
  ],
  sourceUrl: String,
  lastVerified: Date,
});

export const Pricing = mongoose.model("Pricing", pricingSchema);