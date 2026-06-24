import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { nanoid } from "nanoid";
import { Audit } from "../models/auditor.model.js";
import { runAudit } from "../services/auditEngine.js";



type CreateAuditBody = {
  tools: any[]; // you can replace with ITool[] later
  teamSize: number;
  useCase: "coding" | "writing" | "data" | "research" | "mixed";
};



export const createAudit = asyncHandler(
  async (req: Request<{}, {}, CreateAuditBody>, res: Response) => {

    const { tools, teamSize, useCase } = req.body;

    /* ========= VALIDATION ========= */

    if (!tools || !Array.isArray(tools) || tools.length === 0) {
      throw new ApiError(400, "Tools are required");
    }

    if (!teamSize || teamSize <= 0) {
      throw new ApiError(400, "Valid teamSize is required");
    }

    if (!useCase) {
      throw new ApiError(400, "useCase is required");
    }

    /* ========= BUSINESS LOGIC ========= */

    const auditResult = await runAudit(tools, teamSize, useCase);

    /* ========= DB CREATE ========= */

    const audit = await Audit.create({
      tools,
      teamSize,
      useCase,
      totalCurrentSpend: auditResult.totalCurrent,
      totalOptimizedSpend: auditResult.totalOptimized,
      totalSavings: auditResult.totalSavings,
      recommendations: auditResult.recommendations,
      publicId: nanoid(10),
      isHighSavings: auditResult.totalSavings > 500,
    });

    /* ========= RESPONSE ========= */

    return res.status(201).json(
      new ApiResponse(201, audit, "Audit created successfully")
    );
  }
);