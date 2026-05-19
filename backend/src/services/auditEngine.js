import { PRICING } from "../models/pricing.model.js";

export const runAudit = (tools, teamSize, useCase) => {
  let totalCurrent = 0;
  let totalOptimized = 0;
  let recommendations = [];

  tools.forEach(tool => {
    const { toolName, plan, monthlySpend, seats } = tool;

    totalCurrent += monthlySpend;

    let recommendedPlan = plan;
    let recommendedCost = monthlySpend;
    let reason = "Current plan is optimal";

    // 🔥 RULE 1: Overkill plan detection
    if (teamSize <= 3 && plan === "Team") {
      recommendedPlan = "Plus";
      recommendedCost = PRICING[toolName]?.Plus * seats || monthlySpend;
      reason = "Team plan is unnecessary for small teams";
    }

    // 🔥 RULE 2: Underutilized enterprise
    if (teamSize < 10 && plan === "Enterprise") {
      recommendedPlan = "Team";
      recommendedCost = PRICING[toolName]?.Team * seats || monthlySpend;
      reason = "Enterprise plan not justified for small team";
    }

    // 🔥 RULE 3: API vs Subscription mismatch
    if (useCase === "light" && plan === "API") {
      recommendedPlan = "Subscription";
      recommendedCost = monthlySpend * 0.5;
      reason = "API usage too low, subscription is cheaper";
    }

    // 🔥 RULE 4: Alternative suggestion
    if (toolName === "ChatGPT" && useCase === "coding") {
      const claudeCost = PRICING["Claude"]?.Pro * seats;

      if (claudeCost < recommendedCost) {
        recommendedPlan = "Claude Pro";
        recommendedCost = claudeCost;
        reason = "Claude provides similar coding capability at lower cost";
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
  });

  const totalSavings = totalCurrent - totalOptimized;

  return {
    totalCurrent,
    totalOptimized,
    totalSavings,
    recommendations,
  };
};