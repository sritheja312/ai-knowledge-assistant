const { generateEmbedding } = require("./embeddingService");

const testEmbedding = async () => {
  try {
    const text =
      "Employees are entitled to annual leave according to the company leave policy.";

    console.log("Generating embedding...\n");

    const embedding = await generateEmbedding(text);

    console.log("Embedding generated successfully!");
    console.log("Vector dimensions:", embedding.length);

    console.log("\nFirst 10 values:");
    console.log(embedding.slice(0, 10));
  } catch (error) {
    console.error("Embedding error:", error);
  }
};

testEmbedding();