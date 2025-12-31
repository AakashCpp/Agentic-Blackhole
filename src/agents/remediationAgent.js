// src/agents/remediationAgent.js
const callOllama = require("../config/callOllama");

const remediationAgent = async (rootCauseResult) => {
  const finding = rootCauseResult.original.finding || "Unknown issue";
  const rootCause = rootCauseResult.rootCause || "";

  const prompt = `
You are a cybersecurity expert.
Suggest practical remediation steps for the following finding:
"${finding}"
Root Cause: "${rootCause}"
Provide clear steps a developer or sysadmin can follow.
`;

  const remediation = await callOllama(prompt);
  return { ...rootCauseResult, remediation };
};

module.exports = remediationAgent;
