import mongoose, { Schema, Document, Model } from "mongoose";

/* =========================
   INTERFACES
========================= */

export interface ITool {
  toolName: string;
  plan?: string;
  monthlySpend: number;
  seats?: number;
}

export interface IRecommendation {
  toolName: string;

  currentPlan?: string;
  currentSpend?: number;

  recommendedPlan?: string;
  recommendedSpend?: number;

  savings?: number;
  savingsPercent?: number;

  reason: string;

  tag?: "OVERKILL_PLAN" | "UNDERUTILIZED" | "CHEAPER_ALTERNATIVE" | "OPTIMAL";

  confidence?: number;
}

export interface IAudit extends Document {
  tools: ITool[];

  teamSize: number;

  useCase: "coding" | "writing" | "data" | "research" | "mixed";

  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalSavings: number;

  recommendations: IRecommendation[];

  aiSummary?: string;

  publicId: string;

  isHighSavings?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

/* =========================
   SCHEMAS
========================= */

const toolSchema = new Schema<ITool>(
  {
    toolName: {
      type: String,
      required: true,
    },
    plan: String,
    monthlySpend: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const recommendationSchema = new Schema<IRecommendation>(
  {
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
      required: true,
    },

    tag: {
      type: String,
      enum: [
        "OVERKILL_PLAN",
        "UNDERUTILIZED",
        "CHEAPER_ALTERNATIVE",
        "OPTIMAL",
      ],
      default: "OPTIMAL",
    },

    confidence: {
      type: Number,
      default: 0.8,
    },
  },
  { _id: false }
);

const auditSchema = new Schema<IAudit>(
  {
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

    aiSummary: String,

    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    isHighSavings: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   MODEL
========================= */

export const Audit: Model<IAudit> = mongoose.model<IAudit>(
  "Audit",
  auditSchema
);