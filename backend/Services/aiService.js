const { GoogleGenAI, Type } = require("@google/genai");

// =====================================
// GEMINI CLIENT
// =====================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =====================================
// ANALYZE RESUME
// =====================================

const analyzeResume = async ({
  resumeText,
  jobRole,
  jobDescription,
}) => {
  // =====================================
  // CHECK API KEY
  // =====================================

  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is missing in .env"
    );
  }

  if (!resumeText || !resumeText.trim()) {
    throw new Error(
      "Resume text is empty."
    );
  }

  console.log(
    "Gemini API Key loaded:",
    process.env.GEMINI_API_KEY.substring(0, 8) + "********"
  );

  console.log(
    "Resume text length:",
    resumeText.length
  );

  // =====================================
  // PROMPT
  // =====================================

  const prompt = `
You are an expert ATS resume analyzer and professional career advisor.

Analyze ONLY the actual resume information provided.

TARGET JOB ROLE:
${jobRole}

JOB DESCRIPTION:
${jobDescription || "No job description provided."}

RESUME TEXT:
${resumeText}

RULES:

1. Analyze only information actually present in the resume.
2. Never invent experience, education, projects, skills, companies, or achievements.
3. detectedSkills must contain only skills clearly present in the resume.
4. skillGaps should contain skills relevant to the target job but missing or weak.
5. If a job description is provided, compare the resume against that description.
6. If no job description is provided, use common requirements for the target role.
7. All scores must be integers between 0 and 100.
8. Do not artificially increase scores.
9. recommendations must be specific to this resume.
10. jobMatch.score must represent the actual match with the target job.
11. summary must explain the main strengths and weaknesses.
12. Return only valid JSON.
`;

  try {
    // =====================================
    // GEMINI REQUEST
    // =====================================

    console.log(
      "Sending request to Gemini..."
    );

    const response =
      await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: prompt,

        config: {
          responseMimeType:
            "application/json",

          responseSchema: {
            type: Type.OBJECT,

            properties: {
              overallScore: {
                type: Type.INTEGER,
              },

              atsCompatibility: {
                type: Type.INTEGER,
              },

              skillsScore: {
                type: Type.INTEGER,
              },

              experienceScore: {
                type: Type.INTEGER,
              },

              projectsScore: {
                type: Type.INTEGER,
              },

              detectedSkills: {
                type: Type.ARRAY,

                items: {
                  type: Type.STRING,
                },
              },

              skillGaps: {
                type: Type.ARRAY,

                items: {
                  type: Type.OBJECT,

                  properties: {
                    skill: {
                      type: Type.STRING,
                    },

                    priority: {
                      type: Type.STRING,

                      enum: [
                        "High",
                        "Medium",
                        "Low",
                      ],
                    },
                  },

                  required: [
                    "skill",
                    "priority",
                  ],
                },
              },

              recommendations: {
                type: Type.ARRAY,

                items: {
                  type: Type.OBJECT,

                  properties: {
                    title: {
                      type: Type.STRING,
                    },

                    description: {
                      type: Type.STRING,
                    },
                  },

                  required: [
                    "title",
                    "description",
                  ],
                },
              },

              jobMatch: {
                type: Type.OBJECT,

                properties: {
                  score: {
                    type: Type.INTEGER,
                  },

                  matchedSkills: {
                    type: Type.ARRAY,

                    items: {
                      type: Type.STRING,
                    },
                  },

                  missingSkills: {
                    type: Type.ARRAY,

                    items: {
                      type: Type.STRING,
                    },
                  },
                },

                required: [
                  "score",
                  "matchedSkills",
                  "missingSkills",
                ],
              },

              summary: {
                type: Type.STRING,
              },
            },

            required: [
              "overallScore",
              "atsCompatibility",
              "skillsScore",
              "experienceScore",
              "projectsScore",
              "detectedSkills",
              "skillGaps",
              "recommendations",
              "jobMatch",
              "summary",
            ],
          },
        },
      });

    // =====================================
    // GET RESPONSE TEXT
    // =====================================

    const text =
      response.text?.trim();

    console.log(
      "Gemini response received."
    );

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    console.log(
      "Gemini response length:",
      text.length
    );

    // =====================================
    // PARSE JSON
    // =====================================

    let result;

    try {
      result = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "Gemini Raw Response:"
      );

      console.error(text);

      throw new Error(
        "Gemini returned invalid JSON."
      );
    }

    return result;

  } catch (error) {
    // =====================================
    // GEMINI ERROR
    // =====================================

    console.error(
      "================================="
    );

    console.error(
      "GEMINI API ERROR"
    );

    console.error(
      "Status:",
      error.status
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "================================="
    );

    throw error;
  }
};

module.exports = {
  analyzeResume,
};