const { askQuestion } = require("../rag/ragService");

const askRagQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    console.log("\nUser question:", question);

    const result = await askQuestion(question);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("RAG question failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process question",
    });
  }
};

module.exports = {
  askRagQuestion,
};