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
    };
  }

  const result = await collection.insertMany(documents);

  return {
    insertedCount: result.insertedCount,
    insertedIds: result.insertedIds,
  };
}

module.exports = {
  getDocumentCollection,
  storeDocuments,
};