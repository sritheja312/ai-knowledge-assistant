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

    console.log("\n========== LAST CHUNK ==========");
    console.log(result.chunks[result.chunks.length - 1]);
  } catch (error) {
    console.error("Document processing error:", error);
  }
};

testProcessor();