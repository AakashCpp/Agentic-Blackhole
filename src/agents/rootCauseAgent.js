// src/agents/rootCauseAgent.js
const callOllama = require("../config/callOllama");

const rootCauseAgent = async (validatedResult) => {
  const finding = validatedResult.original.finding || "Unknown issue";

  const prompt = `
You are a cybersecurity expert.
Explain the root cause for the following finding:
"${finding}"
Give a clear, technical explanation suitable for developers.
`;

  const rootCause = await callOllama(prompt);
  return { ...validatedResult, rootCause };
};

module.exports = rootCauseAgent;
