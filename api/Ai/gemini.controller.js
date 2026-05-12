const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getFoodDetails = async (req, res) => {
  try {
    const { food } = req.body;

    if (!food) {
      return res.status(400).json({
        success: 0,
        message: "Food name required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Return ONLY valid JSON for "${food}" with:
{
  "description": string,
  "ingredients": string[],
  "nutrition": string[],
  "prep_time": string,
  "cook_time": string,
  "total_time": string
}
`,
            },
          ],
        },
      ],
    });

    const cleanText = response.text.replace(/```json|```/g, "");

    res.json({
      success: 1,
      data: JSON.parse(cleanText),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: 0,
      message: "AI generation failed",
    });
  }
};

module.exports = { getFoodDetails };
