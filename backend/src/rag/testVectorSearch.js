require("dotenv").config();

const { connectDatabase } = require("../database");
const { generateEmbedding } = require("./embeddingService");
const { searchDocuments } = require("./vectorSearch");

const testSearch = async () => {
  try {
    await connectDatabase();

    const question =
      "How many days of maternity leave are available?";

    console.log("\n========== VECTOR SEARCH ==========");

    console.log("\nQuestion:");
    console.log(question);

    console.log("\nGenerating query embedding...");

    const queryEmbedding = await generateEmbedding(question);

    console.log(
      "Query embedding dimensions:",
      queryEmbedding.length
    );

    console.log("\nSearching MongoDB...");

    const results = await searchDocuments(queryEmbedding, 1);

    console.log("\nSearch results:");

    results.forEach((result, index) => {
      console.log("\n-----------------------------");

      console.log(`Result ${index + 1}`);

      console.log("File:", result.fileName);

      console.log("Chunk:", result.chunkIndex);

      console.log("Score:", result.score);

      console.log("Text:", result.text);
    });

    console.log("\n========== SEARCH COMPLETE ==========");
  } catch (error) {
    console.error("Vector search failed:", error);
  }
};

testSearch();