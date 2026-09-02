const { loadPDF } = require("./documentLoader");
const { splitTextIntoChunks } = require("./textSplitter");
const { generateEmbeddings } = require("./embeddingService");
const { storeDocuments } = require("./vectorStore");

const ingestDocument = async (filePath, fileName) => {
  console.log("\n========== DOCUMENT INGESTION ==========");

  // 1. Load PDF
  console.log("\n1. Loading PDF...");

  const pdfData = await loadPDF(filePath);

  console.log(`PDF pages: ${pdfData.numberOfPages}`);
  console.log(`Characters extracted: ${pdfData.text.length}`);

  // 2. Split text
  console.log("\n2. Splitting text into chunks...");

  const chunks = await splitTextIntoChunks(pdfData.text);

  console.log(`Chunks created: ${chunks.length}`);

  // 3. Generate embeddings
  console.log("\n3. Generating embeddings...");

  const embeddings = await generateEmbeddings(chunks);

  console.log(`Embeddings generated: ${embeddings.length}`);

  // 4. Prepare MongoDB documents
  console.log("\n4. Preparing documents for MongoDB...");

  const documents = chunks.map((chunk, index) => ({
    fileName,
    chunkIndex: index,
    text: chunk,
    embedding: embeddings[index],
  }));

  // 5. Store in MongoDB
  console.log("\n5. Storing documents in MongoDB...");

  const result = await storeDocuments(documents);

  console.log(`Inserted: ${result.insertedCount}`);
  console.log(`Updated: ${result.modifiedCount}`);

  console.log("\n========== INGESTION COMPLETE ==========");

  return {
    fileName,
    pages: pdfData.numberOfPages,
    characters: pdfData.text.length,
    chunks: chunks.length,
    embeddings: embeddings.length,
    inserted: result.insertedCount,
    updated: result.modifiedCount,
  };
};

module.exports = {
  ingestDocument,
};