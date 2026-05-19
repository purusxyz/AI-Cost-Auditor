import { asyncHandler } from "../utils/asyncHandler.js";
import { APiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { nanoid } from "nanoid";
import { Audit } from "../models/auditor.model.js"
import { runAudit } from "../services/auditEngine.js";

     
 //get user details from frontend or req.body
 //validattion -- not empty
 //check if user already exists: username, email
 //check for images, check for avatar
 //upload them to cloudinary, avatar
 //create user object -- create entry in db
 //remove pasword and refresh token field from response
 //check for user creation
 //return response
 
 



export const createAudit = async (req, res) => {
  try {
    const { tools, teamSize, useCase } = req.body;

    const auditResult = await runAudit(tools, teamSize, useCase);

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

    res.status(201).json(audit);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};