const path = require("path");

const { loadPDF } = require("./documentLoader");
const { splitTextIntoChunks } = require("./textSplitter");
const { generateEmbeddings } = require("./embeddingService");

const processDocument = async (fileName) => {
  const filePath = path.join(
    __dirname,
    "../../uploads",
    fileName
  );

  // 1. Extract text from PDF
  const document = await loadPDF(filePath);

  // 2. Split text into chunks
  const chunks = await splitTextIntoChunks(document.text);

  // 3. Generate embedding vectors for each chunk
  console.log("\nGenerating embeddings...");

  const embeddings = await generateEmbeddings(chunks);

  console.log("Embeddings generated successfully.");

  return {
    fileName,
    numberOfPages: document.numberOfPages,
    totalCharacters: document.text.length,
    totalChunks: chunks.length,
    embeddings,
    chunks,
  };
};

module.exports = {
  processDocument,
};