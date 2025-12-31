// src/agents/reporterAgent.js
const callOllamaAPI = require("../config/callOllama");

/**
 * Reporter Agent
 * Takes validated scan findings, root cause, and remediation
 * Generates a clear, structured summary report.
 */
const reporterAgent = async (processedResult) => {
  try {
    const finding = processedResult.original.finding || "Unknown finding";
    const validation = processedResult.validation || "";
    const rootCause = processedResult.rootCause || "";
    const remediation = processedResult.remediation || "";

    const prompt = `
You are a cybersecurity report generator.
Create a concise, structured report for developers based on the following information:

Finding: "${finding}"
Validation: "${validation}"
Root Cause: "${rootCause}"
Remediation: "${remediation}"

The report should be clear, actionable, and professional.
`;

    const report = await callOllamaAPI(prompt);

    return {
      ...processedResult,
      report,
    };
  } catch (error) {
    console.error("Reporter Agent Error:", error.message);
    return { ...processedResult, report: "Could not generate report." };
  }
};

module.exports = reporterAgent;
