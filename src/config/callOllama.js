// src/config/callOllama.js
const { exec } = require("child_process");

const callOllama = async (prompt) => {
  return new Promise((resolve, reject) => {
    // Call Ollama CLI with model "llama2" (change if needed)
    exec(`ollama run llama2 "${prompt}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("Ollama CLI error:", error.message);
        return reject(error);
      }
      if (stderr) {
        console.error("Ollama stderr:", stderr);
      }

      // Clean up stdout
      const output = stdout.trim();
      resolve(output);
    });
  });
};

module.exports = callOllama;
