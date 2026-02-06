export const reporterAgent = async (processedResult) => {
  try {
    const { original, validation, rootCause, remediation } = processedResult;

    const report = {
      finding: {
        title: original.finding || "Unknown Finding",
        severity: original.severity || "UNKNOWN",
        category: original.category || "GENERAL",
        affectedTarget: original.target || "N/A",
        description: original.description || "",
      },

      analysis: {
        validation: {
          status: validation?.status || "NOT_VALIDATED",
          confidence: validation?.confidence || "LOW",
          evidence: validation?.evidence || "",
        },

        rootCause: {
          explanation: rootCause || "Root cause analysis not available",
        },
      },

      remediation: {
        priority: remediation?.priority || "MEDIUM",
        fixType: remediation?.type || "CODE_FIX",
        steps: remediation?.steps || [],
        bestPractices: remediation?.bestPractices || [],
      },

      meta: {
        generatedBy: "Blackhole Reporter Agent",
        timestamp: new Date().toISOString(),
        pipelineStage: "FINAL_REPORT",
      },
    };

    return {
      ...processedResult,
      report,
    };
  } catch (error) {
    console.error("Reporter Agent Error:", error.message);

    return {
      ...processedResult,
      report: null,
      error: "Failed to generate structured report",
    };
  }
};
