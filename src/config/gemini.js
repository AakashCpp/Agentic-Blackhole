const axios = require("axios");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const callGemini = async (inputText) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        messages: [
          {
            author: "user",
            content: [
              {
                type: "text",
                text: inputText,
              },
            ],
          },
        ],
      },
      { timeout: 60000 }
    );

    const candidateText = response.data?.candidates?.[0]?.content?.[0]?.text;
    if (!candidateText) {
      console.error("No content returned:", response.data);
      throw new Error("No content returned from Gemini");
    }

    return candidateText;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error("Gemini request failed");
  }
};

module.exports = callGemini;
