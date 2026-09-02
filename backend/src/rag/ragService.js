const { generateEmbedding } = require("./embeddingService");
const { searchDocuments } = require("./vectorSearch");
const { extractAnswer } = require("./answerExtractor");

const MIN_RELEVANCE_SCORE = 0.70;

const askQuestion = async (question) => {

  console.log("\n========== RAG QUERY ==========");


  // 1. Generate embedding for question
  console.log("\n1. Generating question embedding...");

  const queryEmbedding = await generateEmbedding(question);

  console.log(
    `Query vector dimensions: ${queryEmbedding.length}`
  );


  // 2. Search MongoDB
  console.log("\n2. Searching MongoDB...");

  const results = await searchDocuments(
    queryEmbedding,
    3
  );

  if (!results || results.length === 0) {
    return {
      question,
      answer: "I could not find the answer in the provided documents.",
      sources: [],
    };
  }

  console.log(
    `Retrieved ${results.length} chunks`
  );


  // 3. Filter chunks by relevance score
  const relevantResults = results.filter(
    (result) => result.score >= MIN_RELEVANCE_SCORE
  );

  console.log(
    `Relevant chunks after score filtering: ${relevantResults.length}`
  );


  if (relevantResults.length === 0) {
    return {
      question,
      answer: "I could not find the answer in the provided documents.",
      sources: [],
    };
  }


  // 4. Build context using only relevant chunks
  const context = relevantResults
    .map((result, index) => {
      return `
SOURCE ${index + 1}

File: ${result.fileName}
Chunk: ${result.chunkIndex}

Content:
${result.text}
`;
    })
    .join("\n-------------------------\n");


  console.log("\n========== CONTEXT ==========");
  console.log(context);


  // 5. Extract answer
  console.log("\n5. Extracting answer...");

  const answer = extractAnswer(
    question,
    context
  );


  console.log("\n========== ANSWER ==========");
  console.log(answer);


  console.log("\n========== RAG COMPLETE ==========");


  return {
    question,
    answer,
    sources: relevantResults.map((result) => ({
      fileName: result.fileName,
      chunkIndex: result.chunkIndex,
      score: result.score,
    })),
  };
};


module.exports = {
  askQuestion,
};