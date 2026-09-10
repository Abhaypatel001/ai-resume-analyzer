require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function checkModels() {
  try {
    const models = await ai.models.list();

    for await (const model of models) {
      console.log("MODEL:", model.name);
      console.log("METHODS:", model.supportedActions);
      console.log("--------------------------------");
    }
  } catch (error) {
    console.error("ERROR:", error.message);
    console.error("STATUS:", error.status);
  }
}

checkModels();