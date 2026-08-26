const {
  RecursiveCharacterTextSplitter,
} = require("@langchain/textsplitters");

const splitTextIntoChunks = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });

  const chunks = await splitter.splitText(text);

  return chunks;
};

module.exports = {
  splitTextIntoChunks,
};