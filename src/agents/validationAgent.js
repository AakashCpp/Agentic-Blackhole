// const callGemini = require("../config/gemini");

// const validationAgent = async (rawFindings) => {
//   const prompt = `
// You are a cybersecurity validation agent.

// Your task:
// - Analyze raw vulnerability scan findings
// - Identify false positives
// - Keep only real and relevant security issues
// - Add confidence level (High, Medium, Low)
// - Explain briefly why each finding is valid or invalid

// Return output strictly in JSON format:

// {
//   "validated_findings": [
//     {
//       "id": "",
//       "severity": "",
//       "is_valid": true/false,
//       "confidence": "",
//       "reason": ""
//     }
//   ]
// }

// Raw Findings:
// ${JSON.stringify(rawFindings, null, 2)}
// `;

//   const response = await callGemini(prompt);

//   return JSON.parse(response);
// };

// module.exports = validationAgent;

// src/agents/validationAgent.js

const callGemini = async (text) => {
  // Temporary mock response
  return `Validated: ${text} ✅`; // Pretend Gemini returned validated info
};

const validationAgent = async (scanResult) => {
  try {
    // Here we would call Gemini normally
    const validation = await callGemini(scanResult.finding || "No finding");
    return {
      original: scanResult,
      validation,
    };
  } catch (error) {
    console.error("Validation error:", error.message);
    return { original: scanResult, validation: null };
  }
};

module.exports = validationAgent;

// // src/agents/validationAgent.js
// const callOllama = require("../config/callOllama");

// /**
//  * Validation Agent
//  * Takes a raw scan finding and validates it using an LLM.
//  * Can detect false positives, provide quick checks, and clarify the issue.
//  */
// const validationAgent = async (scanResult) => {
//   try {
//     const finding = scanResult.finding || "Unknown finding";

//     // Prompt for Ollama
//     const prompt = `
// You are a cybersecurity expert.
// Validate the following scan finding:
// "${finding}"
// Check if it is a real security issue or a false positive.
// Provide a concise validation message suitable for a developer.
// `;

//     // Call Ollama LLM locally
//     const validation = await callOllama(prompt);

//     // Return structured result
//     return {
//       original: scanResult,
//       validation
//     };
//   } catch (error) {
//     console.error("Validation Agent Error:", error.message);
//     return {
//       original: scanResult,
//       validation: "Could not validate the finding."
//     };
//   }
// };

// module.exports = validationAgent;
