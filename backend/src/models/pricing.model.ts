import mongoose, { Schema, Document, Model } from "mongoose";

/* =========================
   INTERFACES
========================= */

export interface IPlan {
  name: string;
  pricePerUser: number;
  type?: "monthly" | "yearly" | "api";
}

export interface IPricing extends Document {
  toolName: string;

  plans: IPlan[];

  sourceUrl: string;

  lastVerified: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

/* =========================
   SCHEMAS
========================= */

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
    },
    pricePerUser: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["monthly", "yearly", "api"],
      default: "monthly",
    },
  },
  { _id: false }
);

const pricingSchema = new Schema<IPricing>(
  {
    toolName: {
      type: String,
      required: true,
      unique: true,
    },

    plans: {
      type: [planSchema],
      required: true,
    },

    sourceUrl: {
      type: String,
      required: true,
    },

    lastVerified: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   MODEL
========================= */

export const Pricing: Model<IPricing> = mongoose.model<IPricing>(
  "Pricing",
  pricingSchema
);