import { Router } from "express";
import { createAudit } from "../controllers/auditor.controller.js"

const router = Router()

router.route("/auditor").post(createAudit)


export default router;