const { getDatabase } = require("../database");

const COLLECTION_NAME = "documents";

async function getDocumentCollection() {
  const db = getDatabase();

  return db.collection(COLLECTION_NAME);
}

async function storeDocuments(documents) {
  const collection = await getDocumentCollection();

  if (!documents || documents.length === 0) {
    return {
      insertedCount: 0,
      modifiedCount: 0,
    };
  }

  let insertedCount = 0;
  let modifiedCount = 0;

  for (const document of documents) {
    const result = await collection.updateOne(
      {
        fileName: document.fileName,
        chunkIndex: document.chunkIndex,
      },
      {
        $set: {
          text: document.text,
          embedding: document.embedding,
        },
      },
      {
        upsert: true,
      }
    );

    if (result.upsertedCount === 1) {
      insertedCount++;
    } else if (result.modifiedCount === 1) {
      modifiedCount++;
    }
  }

  return {
    insertedCount,
    modifiedCount,
  };
}

module.exports = {
  getDocumentCollection,
  storeDocuments,
};