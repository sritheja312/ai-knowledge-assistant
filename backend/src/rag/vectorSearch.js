const { getDocumentCollection } = require("./vectorStore");

const searchDocuments = async (queryEmbedding, limit = 5) => {
  const collection = await getDocumentCollection();

  const pipeline = [
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit: limit,
      },
    },
    {
      $project: {
        _id: 0,
        fileName: 1,
        chunkIndex: 1,
        text: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ];

  const results = await collection.aggregate(pipeline).toArray();

  return results;
};

module.exports = {
  searchDocuments,
};