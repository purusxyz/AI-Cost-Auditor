import mongoose, { Schema, Document, Model } from "mongoose";

/* =========================
   INTERFACE
========================= */

export interface ILead extends Document {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId?: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

/* =========================
   SCHEMA
========================= */

const leadSchema = new Schema<ILead>(
  {
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
  },
  {
    timestamps: true,
  }
);

/* =========================
   MODEL
========================= */

export const Lead: Model<ILead> = mongoose.model<ILead>(
  "Lead",
  leadSchema
);