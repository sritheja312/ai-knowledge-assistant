let textGenerator = null;

const getTextGenerator = async () => {
  if (!textGenerator) {
    console.log("Loading local LLM...");

    const { pipeline } = await import("@huggingface/transformers");

    textGenerator = await pipeline(
      "text-generation",
      "Mozilla/Qwen2.5-0.5B-Instruct"
    );

    console.log("Local LLM loaded.");
  }

  return textGenerator;
};

const generateAnswer = async (question, context) => {
  const generator = await getTextGenerator();

  const prompt = `
You are a document question-answering system.

Use ONLY the information in the context.

Your task is to extract the exact answer to the question.

Rules:
- Do not explain your answer. Give a short, direct answer.
- Do not repeat the context.
- Do not combine different rules or conditions.
- Do not calculate or invent information.
- If multiple values appear in the context, choose the value that directly answers the question.
- If the answer is not present, return exactly:
I could not find the answer in the provided documents.

Context:
${context}

Question:
${question}

Answer:
`;

  const result = await generator(prompt, {
    max_new_tokens: 10,
    do_sample: false,
    return_full_text: false,
  });

  return result[0].generated_text.trim();
};

module.exports = {
  generateAnswer,
};