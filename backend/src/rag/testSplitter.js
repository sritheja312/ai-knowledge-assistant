const path = require("path");

const { loadPDF } = require("./documentLoader");
const { splitTextIntoChunks } = require("./textSplitter");

const pdfPath = path.join(
  __dirname,
  "../../uploads/1787747738007-leave-policy.pdf"
);

const testSplitter = async () => {
  try {
    // Step 1: Extract text from PDF
    const document = await loadPDF(pdfPath);

    console.log("Total pages:", document.numberOfPages);
    console.log("Original text length:", document.text.length);

    // Step 2: Split text into chunks
    const chunks = await splitTextIntoChunks(document.text);

    console.log("\n========== CHUNKING RESULT ==========");
    console.log("Total chunks:", chunks.length);

    chunks.forEach((chunk, index) => {
      console.log(`\n========== CHUNK ${index + 1} ==========`);
      console.log("Characters:", chunk.length);
      console.log(chunk);
    });
  } catch (error) {
    console.error("Chunking error:", error);
  }
};

testSplitter();