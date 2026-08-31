const { loadPDF } = require("./documentLoader");
const { splitTextIntoChunks } = require("./textSplitter");
const { generateEmbeddings } = require("./embeddingService");
const { storeDocuments } = require("./vectorStore");

const processDocument = async (filePath, fileName) => {
  console.log("\n========== DOCUMENT PROCESSING ==========");

  // Step 1: Extract text from PDF
  console.log("1. Loading PDF...");

  const document = await loadPDF(filePath);

  console.log(`PDF loaded: ${document.numberOfPages} pages`);
  console.log(`Characters extracted: ${document.text.length}`);

  // Step 2: Split text into chunks
  console.log("\n2. Splitting text into chunks...");

  const chunks = await splitTextIntoChunks(document.text);

  console.log(`Chunks created: ${chunks.length}`);

  // Step 3: Generate embeddings
  console.log("\n3. Generating embeddings...");

  const embeddings = await generateEmbeddings(chunks);

  console.log(`Embeddings generated: ${embeddings.length}`);
  console.log(`Vector dimensions: ${embeddings[0].length}`);

  // Step 4: Prepare documents for MongoDB
  console.log("\n4. Preparing documents for MongoDB...");

  const documents = chunks.map((chunk, index) => ({
    fileName,
    chunkIndex: index,
    text: chunk,
    embedding: embeddings[index],
  }));

  // Step 5: Store in MongoDB
  console.log("\n5. Storing documents in MongoDB...");

  const result = await storeDocuments(documents);

  console.log(`Stored ${result.insertedCount} documents`);

  console.log("\n========== PROCESSING COMPLETE ==========");

  return {
    fileName,
    pages: document.numberOfPages,
    characters: document.text.length,
    chunks: chunks.length,
    embeddings: embeddings.length,
    stored: result.insertedCount,
  };
};

module.exports = {
  processDocument,
};