// src/agents/rootCauseAgent.js
const callOllama = require("../config/callOllama");

const rootCauseAgent = async (validatedResult) => {
  try {
    const finding = validatedResult?.finding || "Unknown finding";
    const validation = validatedResult?.validation || {};

    const prompt = `
          You are a senior application security engineer performing root cause analysis
          on validated security findings produced by an automated multi-agent pipeline.

          You are provided with the FULL validated scan object from the previous agent,
          including the original finding and its validation verdict.

          Your responsibility is to explain WHY the issue exists at a technical level,
          not how to exploit it and not how to fix it.

          --------------------------------------------------
          ROOT CAUSE ANALYSIS GUIDELINES
          --------------------------------------------------

          1. Analyze the validation context carefully
            - If the issue is classified as "False Positive", identify why the scanner
              reported it and what technical condition triggered the alert.
            - If "Valid", identify the exact technical weakness that enables the issue.
            - If "Inconclusive", explain what missing information prevents certainty.

          2. Identify the origin of the issue
            - Application logic or source code
            - Security-relevant configuration
            - Framework or platform default behavior
            - Third-party or external dependency
            - Architectural or design decision

          3. Determine how the issue was introduced
            - Developer oversight or incorrect implementation
            - Missing security hardening during deployment
            - Insecure default settings in frameworks or servers
            - Legacy design assumptions
            - Dependency behavior outside developer control

          4. Scope the affected layer
            - Application, API, client, server, or infrastructure
            - Avoid guessing — use "Unknown" if unclear

          5. Keep analysis factual and restrained
            - Do NOT restate the scan finding
            - Do NOT speculate beyond evidence
            - Do NOT provide remediation guidance
            - Do NOT modify existing fields

          --------------------------------------------------
          INPUT OBJECT
          --------------------------------------------------
          FINDING:
          ${JSON.stringify(finding, null, 2)}

          VALIDATION CONTEXT:
          ${JSON.stringify(validation, null, 2)}

          --------------------------------------------------
          OUTPUT REQUIREMENTS
          --------------------------------------------------
          - Output ONLY valid JSON
          - No markdown
          - No explanations outside JSON
          - Technical, developer-readable language

          --------------------------------------------------
          OUTPUT SCHEMA (STRICT)
          --------------------------------------------------
          {
            "root_cause_category": "Code" | "Configuration" | "Design" | "Dependency" | "Unknown",
            "technical_root_cause": "<2–4 sentence explanation of why this issue exists>",
            "affected_layer": "Application" | "API" | "Server" | "Client" | "Infrastructure" | "Unknown",
            "introduced_by": "Developer Implementation" | "Framework Default" | "Third-Party Dependency" | "Deployment Configuration" | "Unknown"
          }
          `;

    const raw = await callOllama(prompt);

    const root_cause = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]);

    // 🔑 same chaining pattern as validation agent
    return {
      ...validatedResult,
      root_cause,
    };
  } catch (error) {
    console.error("Root Cause Agent Error:", error.message);

    return {
      ...validatedResult,
      root_cause: {
        root_cause_category: "Unknown",
        technical_root_cause:
          "The root cause could not be determined due to insufficient or malformed analysis output.",
        affected_layer: "Unknown",
        introduced_by: "Unknown",
      },
    };
  }
};

export default rootCauseAgent;
