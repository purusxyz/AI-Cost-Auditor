import { Pricing } from "../models/pricing.model.js";

/* =========================
   TYPES
========================= */

type ToolInput = {
  toolName: string;
  plan?: string;
  monthlySpend: number;
  seats?: number;
};

type Recommendation = {
  toolName: string;
  currentPlan?: string;
  currentSpend: number;
  recommendedPlan: string;
  recommendedSpend: number;
  savings: number;
  reason: string;
};

/* =========================
   SERVICE
========================= */

export const runAudit = async (
  tools: ToolInput[],
  teamSize: number,
  useCase: string
) => {
  let totalCurrent = 0;
  let totalOptimized = 0;
  const recommendations: Recommendation[] = [];

  for (const tool of tools) {
    const { toolName, plan, monthlySpend, seats = 1 } = tool;

    totalCurrent += monthlySpend;

    let recommendedPlan = plan || "Unknown";
    let recommendedCost = monthlySpend;
    let reason = "Current plan is optimal";

    /* ========= FETCH PRICING ========= */

    const pricingDoc = await Pricing.findOne({ toolName }).lean();

    const getPrice = (planName: string): number | null => {
      const planData = pricingDoc?.plans.find(p => p.name === planName);
      return planData ? planData.pricePerUser * seats : null;
    };

    /* ========= RULE 1 ========= */

    if (teamSize <= 3 && plan === "Team") {
      const price = getPrice("Plus");
      if (price) {
        recommendedPlan = "Plus";
        recommendedCost = price;
        reason = "Team plan is unnecessary for small teams";
      }
    }

    /* ========= RULE 2 ========= */

    if (teamSize < 10 && plan === "Enterprise") {
      const price = getPrice("Team");
      if (price) {
        recommendedPlan = "Team";
        recommendedCost = price;
        reason = "Enterprise plan not justified for small team";
      }
    }

    /* ========= RULE 3 ========= */

    if (useCase === "light" && plan === "API") {
      recommendedPlan = "Subscription";
      recommendedCost = monthlySpend * 0.5;
      reason = "API usage too low, subscription is cheaper";
    }

    /* ========= RULE 4 ========= */

    if (toolName === "ChatGPT" && useCase === "coding") {
      const claudeDoc = await Pricing.findOne({ toolName: "Claude" }).lean();
      const claudePlan = claudeDoc?.plans.find(p => p.name === "Pro");

      if (claudePlan) {
        const claudeCost = claudePlan.pricePerUser * seats;

        if (claudeCost < recommendedCost) {
          recommendedPlan = "Claude Pro";
          recommendedCost = claudeCost;
          reason =
            "Claude provides similar coding capability at lower cost";
        }
      }
    }

    const savings = monthlySpend - recommendedCost;
    totalOptimized += recommendedCost;

    recommendations.push({
      toolName,
      currentPlan: plan,
      currentSpend: monthlySpend,
      recommendedPlan,
      recommendedSpend: recommendedCost,
      savings,
      reason,
    });
  }

  const totalSavings = totalCurrent - totalOptimized;

  return {
    totalCurrent,
    totalOptimized,
    totalSavings,
    recommendations,
  };
};