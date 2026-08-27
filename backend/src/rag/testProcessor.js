const { processDocument } = require("./documentProcessor");

const testProcessor = async () => {
  try {
    const result = await processDocument(
      "1787747738007-leave-policy.pdf"
    );

    console.log("\n========== DOCUMENT ==========");
    console.log("File:", result.fileName);
    console.log("Pages:", result.numberOfPages);
    console.log("Characters:", result.totalCharacters);
    console.log("Chunks:", result.totalChunks);

    console.log("\n========== FIRST CHUNK ==========");
    console.log(result.chunks[0]);

    console.log("\n========== FIRST EMBEDDING ==========");
    console.log("Vector dimensions:", result.embeddings[0].length);
    console.log("First 10 values:");
    console.log(result.embeddings[0].slice(0, 10));

    console.log("\n========== EMBEDDING SUMMARY ==========");
    console.log("Total chunks:", result.chunks.length);
    console.log("Total embeddings:", result.embeddings.length);
  } catch (error) {
    console.error("Document processing error:", error);
  }
};

testProcessor();