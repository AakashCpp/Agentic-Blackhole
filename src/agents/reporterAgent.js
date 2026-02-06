// src/agents/reporterAgent.js

const reporterAgent = async (analysisResult) => {
  try {
    const finding = analysisResult.finding || {};
    const validation = analysisResult.validation || {};
    const rootCause = analysisResult.root_cause || {};
    const remediation = analysisResult.remediation || {};

    return {
      finding_report: {
        finding: {
          id: finding.id || null,
          name: finding.name || "Unknown",
          severity: finding.severity || "Unknown",
          endpoint: finding.endpoint || "Unknown",
          evidence: finding.evidence || null,
        },

        analysis: {
          validation: {
            vulnerability_type: validation.vulnerability_type || "Unknown",
            classification: validation.classification || "Inconclusive",
            confidence_level: validation.confidence_level || "Low",
            evidence_strength: validation.evidence_strength || "Weak",
            exploitability: validation.exploitability || {},
            justification: validation.justification || "",
            recommended_next_step: validation.recommended_next_step || "",
          },

          root_cause: {
            category: rootCause.root_cause_category || "Unknown",
            technical_explanation: rootCause.technical_root_cause || "",
            affected_layer: rootCause.affected_layer || "Unknown",
            introduced_by: rootCause.introduced_by || "Unknown",
          },

          remediation: {
            fix_strategy: remediation.fix_strategy || "",
            immediate_actions: remediation.immediate_actions || [],
            code_level_changes:
              remediation.code_level_changes || "Not applicable",
            configuration_or_system_changes:
              remediation.configuration_or_system_changes || "Not applicable",
            preventive_controls: remediation.preventive_controls || [],
            verification_steps: remediation.verification_steps || [],
          },
        },
      },

      meta: {
        pipeline_stage: "completed",
        generated_at: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Reporter Agent Error:", error.message);

    return {
      error: "Failed to assemble structured security report",
      meta: {
        pipeline_stage: "failed",
        generated_at: new Date().toISOString(),
      },
    };
  }
};

export default reporterAgent;
