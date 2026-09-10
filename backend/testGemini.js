require("dotenv").config();

const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    console.log("Testing Gemini JSON response...");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",

      contents: `
Analyze this resume:

Name: Abhay
Skills: JavaScript, React, Node.js, MongoDB
Education: BCA

Return a resume score between 0 and 100.
`,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: Type.OBJECT,

          properties: {
            score: {
              type: Type.INTEGER,
            },

            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },

            summary: {
              type: Type.STRING,
            },
          },

          required: [
            "score",
            "skills",
            "summary",
          ],
        },
      },
    });

    console.log("SUCCESS!");
    console.log(response.text);

  } catch (error) {
    console.log("==============================");
    console.log("GEMINI JSON TEST ERROR");
    console.log("Status:", error.status);
    console.log("Message:", error.message);
    console.log("==============================");
  }
}

testGemini();