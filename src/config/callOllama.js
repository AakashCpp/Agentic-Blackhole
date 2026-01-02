// src/config/callOllama.js

const callOllama = async (prompt) => {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama2",
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response?.trim();
  } catch (err) {
    console.error("Ollama API Error:", err.message);
    throw err;
  }
};

module.exports = callOllama;
