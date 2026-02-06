// src/agents/riskScoreAgent.js

const riskScoreAgent = async (analysisResult) => {
  const finding = analysisResult.finding || {};
  const validation = analysisResult.validation || {};

  // 1️⃣ Base severity
  const severityMap = {
    High: 7,
    Medium: 5,
    Low: 3,
    Informational: 1,
  };

  const baseSeverity = severityMap[finding.risk] || 3;

  // 2️⃣ Confidence multiplier
  const confidenceMultiplierMap = {
    High: 1.2,
    Medium: 1.0,
    Low: 0.7,
  };

  const confidenceMultiplier =
    confidenceMultiplierMap[validation.confidence_level] || 1.0;

  // 3️⃣ Exploitability bonus
  let exploitabilityBonus = 0;

  if (validation.exploitability?.attacker_access === "Unauthenticated") {
    exploitabilityBonus += 2;
  }

  if (validation.exploitability?.external_reachability === true) {
    exploitabilityBonus += 1;
  }

  if (validation.exploitability?.user_input_involved === true) {
    exploitabilityBonus += 1;
  }

  // 4️⃣ Final score
  let rawScore = baseSeverity * confidenceMultiplier + exploitabilityBonus;

  // Clamp 0–10
  const risk_score = Math.min(10, Math.round(rawScore));

  // 5️⃣ Risk label
  let risk_level = "Low";
  if (risk_score >= 8) risk_level = "Critical";
  else if (risk_score >= 6) risk_level = "High";
  else if (risk_score >= 4) risk_level = "Medium";

  return {
    ...analysisResult,
    risk: {
      score: risk_score,
      level: risk_level,
      factors: {
        base_severity: finding.risk || "Unknown",
        confidence: validation.confidence_level || "Unknown",
        exploitability: validation.exploitability || {},
      },
    },
  };
};

export default riskScoreAgent;
