const { pipeline } = require("@huggingface/transformers");

let embeddingPipeline = null;

const getEmbeddingPipeline = async () => {
  if (!embeddingPipeline) {
    console.log("Loading embedding model...");

    embeddingPipeline = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    console.log("Embedding model loaded.");
  }

  return embeddingPipeline;
};

const generateEmbedding = async (text) => {
  const extractor = await getEmbeddingPipeline();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};

const generateEmbeddings = async (chunks) => {
  const embeddings = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);

    embeddings.push(embedding);
  }

  return embeddings;
};

module.exports = {
  generateEmbedding,
  generateEmbeddings,
};