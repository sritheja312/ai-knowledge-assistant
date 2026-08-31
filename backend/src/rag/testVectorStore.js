require("dotenv").config();

const { connectDatabase } = require("../database");
const { storeDocuments } = require("./vectorStore");

async function testVectorStore() {
  try {
    await connectDatabase();

    const documents = [
      {
        fileName: "test-document.pdf",
        chunkIndex: 0,
        text: "Employees are eligible for annual leave according to company policy.",
        embedding: [0.1, 0.2, 0.3],
        createdAt: new Date(),
      },
    ];

    const result = await storeDocuments(documents);

    console.log("Documents stored successfully!");
    console.log(result);
  } catch (error) {
    console.error("Failed to store documents:", error);
  }
}

testVectorStore();