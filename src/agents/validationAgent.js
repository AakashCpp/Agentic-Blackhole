// src/agents/validationAgent.js
const callOllama = require("../config/callOllama");

/**
 * Validation Agent
 * Takes a raw scan finding and validates it using an LLM.
 * Can detect false positives, provide quick checks, and clarify the issue.
 */
const validationAgent = async (scanResult) => {
  try {
    const finding = scanResult.finding || "Unknown finding";

    // Prompt for Ollama
    const prompt = `
        You are a cybersecurity expert.
        Validate the following scan finding:
        "${finding}"
        Check if it is a real security issue or a false positive.
        Provide a concise validation message suitable for a developer.
        `;

    // Call Ollama LLM locally
    const validation = await callOllama(prompt);

    // Return structured result
    return {
      original: scanResult,
      validation,
    };
  } catch (error) {
    console.error("Validation Agent Error:", error.message);
    return {
      original: scanResult,
      validation: "Could not validate the finding.",
    };
  }
};

module.exports = validationAgent;
