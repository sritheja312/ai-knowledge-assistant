const path = require("path");

const { loadPDF } = require("./documentLoader");
const { splitTextIntoChunks } = require("./textSplitter");

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

  return {
    fileName,
    numberOfPages: document.numberOfPages,
    totalCharacters: document.text.length,
    totalChunks: chunks.length,
    chunks,
  };
};

module.exports = {
  processDocument,
};